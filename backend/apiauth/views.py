from allauth.account import app_settings as allauth_settings
from allauth.account.models import EmailAddress
from allauth.account.utils import complete_signup
from allauth.account.views import ConfirmEmailView
from django.contrib.sites.shortcuts import get_current_site
from django.http import HttpResponseRedirect
from django.utils.decorators import method_decorator
from django.utils.translation import gettext_lazy as _
from django.views.decorators.debug import sensitive_post_parameters
from rest_framework import generics, parsers, permissions, response, status, views
from rest_framework_simplejwt.authentication import AUTH_HEADER_TYPES
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import (
    LoginSerializer,
    PasswordChangeSerializer,
    PasswordResetConfirmSerializer,
    PasswordResetSerializer,
    RegisterSerializer,
    ResendEmailVerificationSerializer,
    SocialLoginSerializer,
    UserDetailSerializer,
    VerifyEmailSerializer,
)

sensitive_post_parameters_m = method_decorator(
    sensitive_post_parameters(
        "password",
        "old_password",
        "new_password1",
        "new_password2",
    ),
)


class UserDetailView(generics.RetrieveUpdateAPIView):
    serializer_class = UserDetailSerializer

    def get_object(self):
        return self.request.user


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = (permissions.AllowAny,)

    @sensitive_post_parameters_m
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def get_response_data(self, user):
        if (
            allauth_settings.EMAIL_VERIFICATION
            == allauth_settings.EmailVerificationMethod.MANDATORY
        ):
            return {"detail": _("Verification e-mail sent.")}

        data = {
            "access": self.access_token,
            "refresh": self.refresh_token,
        }
        return data

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        data = self.get_response_data(user)

        return response.Response(data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        user = serializer.save(self.request)
        if (
            allauth_settings.EMAIL_VERIFICATION
            != allauth_settings.EmailVerificationMethod.MANDATORY
        ):
            refresh = RefreshToken.for_user(user)

            self.refresh_token = str(refresh)
            self.access_token = str(refresh.access_token)

        complete_signup(
            self.request._request,
            user,
            allauth_settings.EMAIL_VERIFICATION,
            None,
        )
        return user

    @staticmethod
    def get(request):
        try:
            email = request.GET.get("email", None)
            if email:
                User.objects.get(email=email.lower())
                return response.Response(
                    {"detail": _("This email is already registered")},
                    status=status.HTTP_200_OK,
                )
        except User.DoesNotExist:
            return response.Response(
                {"detail": _("This email is not registered")},
                status=status.HTTP_404_NOT_FOUND,
            )

        try:
            username = request.GET.get("username", None)
            if username:
                User.objects.get(username=username.lower())
                return response.Response(
                    {"detail": _("This username is already registered")},
                    status=status.HTTP_200_OK,
                )
        except User.DoesNotExist:
            return response.Response(
                {"detail": _("This username is not registered")},
                status=status.HTTP_404_NOT_FOUND,
            )

        return response.Response(
            {"detail": _("Username or email is required")},
            status=status.HTTP_400_BAD_REQUEST,
        )


class VerifyEmailView(views.APIView, ConfirmEmailView):
    permission_classes = (permissions.AllowAny,)
    parser_classes = (parsers.FormParser, parsers.JSONParser)

    @staticmethod
    def get_redirect_url(request, current_site):
        return f"{request.scheme}://{current_site.domain}/auth/verify-email-success/"

    @staticmethod
    def get_serializer(*args, **kwargs):
        return VerifyEmailSerializer(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.kwargs["key"] = serializer.validated_data["key"]
        confirmation = self.get_object()
        confirmation.confirm(self.request)

        if serializer.validated_data["redirect_after_verify"] is False:
            return response.Response(
                {"detail": _("Email verified")}, status=status.HTTP_200_OK
            )

        current_site = get_current_site(self.request)
        redirect_url = self.get_redirect_url(request, current_site)
        return HttpResponseRedirect(redirect_url)

    @staticmethod
    def get(request, *args, **kwargs):
        return response.Response(
            {"detail": 'Method "GET" not allowed.'},
            status=status.HTTP_405_METHOD_NOT_ALLOWED,
        )


class ResendEmailVerificationView(generics.CreateAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = ResendEmailVerificationSerializer
    queryset = EmailAddress.objects.all()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = EmailAddress.objects.filter(**serializer.validated_data).first()
        if email and not email.verified:
            email.send_confirmation(request)

        return response.Response({"detail": _("ok")}, status=status.HTTP_200_OK)


class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = (permissions.AllowAny,)
    www_authenticate_realm = "api"

    def get_authenticate_header(self, request):
        return '{0} realm="{1}"'.format(
            AUTH_HEADER_TYPES[0],
            self.www_authenticate_realm,
        )

    def get_response(self):
        refresh = RefreshToken.for_user(self.user)
        refresh_token = str(refresh)
        access_token = str(refresh.access_token)
        data = {"access": access_token, "refresh": refresh_token}
        return response.Response(data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        self.request = request
        self.serializer = self.get_serializer(data=self.request.data)
        self.serializer.is_valid(raise_exception=True)
        self.user = self.serializer.validated_data["user"]

        return self.get_response()


class PasswordResetView(generics.GenericAPIView):
    serializer_class = PasswordResetSerializer
    permission_classes = (permissions.AllowAny,)

    def post(self, request, *args, **kwargs):
        # Create a serializer with request.data
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save()
        # Return the success message with OK HTTP status
        return response.Response(
            {"detail": _("Password reset e-mail has been sent.")},
            status=status.HTTP_200_OK,
        )


class PasswordResetConfirmView(generics.GenericAPIView):
    """
    Password reset e-mail link is confirmed, therefore
    this resets the user's password.
    Accepts the following POST parameters: token, uid,
        new_password1, new_password2
    Returns the success/fail message.
    """

    serializer_class = PasswordResetConfirmSerializer
    permission_classes = (permissions.AllowAny,)

    @sensitive_post_parameters_m
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return response.Response(
            {"detail": _("Password has been reset with the new password.")},
        )


class PasswordChangeView(generics.GenericAPIView):
    serializer_class = PasswordChangeSerializer

    @sensitive_post_parameters_m
    def dispatch(self, *args, **kwargs):
        return super().dispatch(*args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return response.Response({"detail": _("New password has been updated.")})


class SocialLoginView(LoginView):
    serializer_class = SocialLoginSerializer
