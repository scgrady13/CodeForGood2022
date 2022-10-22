from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

from .views import (
    LoginView,
    RegisterView,
    UserDetailView,
)

urlpatterns = [
    path(
        "register/",
        RegisterView.as_view(),
        name="account_register",
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
]
