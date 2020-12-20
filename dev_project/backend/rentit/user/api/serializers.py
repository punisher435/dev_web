from rest_framework import serializers
from user.models import customUser_profile

class profile_serializer(serializers.ModelSerializer):
    class Meta:
        model = customUser_profile
        fields='__all__' 