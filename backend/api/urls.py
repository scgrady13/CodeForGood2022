from django.urls import path

urlpatterns = [
  path('users/', views.UserList.as_view()),
]