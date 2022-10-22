from rest_framework import generics
from apiauth.models import User

from .serializers import StudentListCreateSerializer

class StudentListCreate(generics.ListCreateAPIView):
    serializer_class = StudentListCreateSerializer

    def get_queryset(self):
        full_name = self.kwargs.get('full_name', None)
        return User.objects.filter(role='student', full_name__icontains=full_name)


class StudentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.filter(role='student')
    serializer_class = StudentListCreateSerializer
