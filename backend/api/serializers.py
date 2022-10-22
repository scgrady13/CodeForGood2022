from rest_framework import serializers
from apiauth.models import User

class StudentListCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
          'username', 
          'full_name', 
          'phone_number', 
          'role',
          'address', 
          'city',
          'state',
          'country'
        )

    def create(self, validated_data):
        user = User.objects.create_user(
          **validated_data,password="RandomPassword",
          role="student"
        )
        return user
