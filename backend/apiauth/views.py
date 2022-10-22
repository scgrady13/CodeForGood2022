from django.utils.decorators import method_decorator
from django.utils.translation import gettext_lazy as _
from django.views.decorators.debug import sensitive_post_parameters
from rest_framework import generics, permissions, response, status
from rest_framework_simplejwt.authentication import AUTH_HEADER_TYPES
from rest_framework_simplejwt.tokens import RefreshToken

from .models import User
from .serializers import (
    LoginSerializer,
    RegisterSerializer,
    UserDetailSerializer,
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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return response.Response(status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        user = serializer.save(self.request)
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
