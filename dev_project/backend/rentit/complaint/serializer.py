from .models import room_complaints
from rest_framework import serializers


class room_complaints_serializer(serializers.ModelSerializer):
    class Meta:
        model = room_complaints
        fields = '__all__'
