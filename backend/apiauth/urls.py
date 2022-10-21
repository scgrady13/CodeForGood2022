from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

from .provider_login_view import FacebookLogin
from .views import (
    LoginView,
    PasswordChangeView,
    PasswordResetConfirmView,
    PasswordResetView,
    RegisterView,
    ResendEmailVerificationView,
    UserDetailView,
    VerifyEmailView,
)

urlpatterns = [
    path(
        "register/",
        RegisterView.as_view(),
        name="account_register",
    ),
    path(
        "verify-email/",
        VerifyEmailView.as_view(),
        name="account_confirm_email",
    ),
    path(
        "resend-email/",
        ResendEmailVerificationView.as_view(),
        name="account_resend_confirm_email",
    ),
    path(
        "password/reset/",
        PasswordResetView.as_view(),
        name="account_reset_password",
    ),
    path(
        "password/reset/confirm/",
        PasswordResetConfirmView.as_view(),
        name="account_reset_password_confirm",
    ),
    path(
        "password/change/",
        PasswordChangeView.as_view(),
        name="account_change_password",
    ),
    path(
        "login/",
        LoginView.as_view(),
        name="account_login",
    ),
    path(
        "user/",
        UserDetailView.as_view(),
        name="user_detail",
    ),
    path(
        "token/verify/",
        TokenVerifyView.as_view(),
        name="token_verify",
    ),
    path(
        "token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),
    # Social Login
    path(
        "login/facebook/",
        FacebookLogin.as_view(),
        name="social_facebook_login",
    ),
]
