from django.urls import path
from .views import StudentListCreate, StudentDetail

urlpatterns = [
  path('students/', StudentListCreate.as_view()),
  path('student/<int:pk>/', StudentDetail.as_view()),
]