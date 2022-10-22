from rest_framework import generics
from apiauth.models import User

from .serializers import UserListCreateSerializer

class UserListCreate(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserListCreateSerializer

