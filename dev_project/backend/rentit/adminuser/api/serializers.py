from rest_framework import serializers
from adminuser.models import admin_user

class admin_user_serializer(serializers.ModelSerializer):
    class Meta:
        model = admin_user
        fields = ('username','first_name','last_name','email','mobile')