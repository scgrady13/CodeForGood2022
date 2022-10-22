from django.urls import path
from .views import UserListCreate, UserDetail

urlpatterns = [
  path('users/', UserListCreate.as_view()),
  path('users/<int:pk>/', UserDetail.as_view()),
]