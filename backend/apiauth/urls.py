from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView, TokenObtainPairView

urlpatterns = [
    path(
        "login/",
        TokenObtainPairView.as_view(),
        name="account_login",
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
