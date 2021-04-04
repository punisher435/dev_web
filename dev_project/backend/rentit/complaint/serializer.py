from .models import room_complaints,shop_complaints,apartment_complaints
from rest_framework import serializers


class room_complaints_serializer(serializers.ModelSerializer):
    class Meta:
        model = room_complaints
        fields = '__all__'


class shop_complaints_serializer(serializers.ModelSerializer):
    class Meta:
        model = shop_complaints
        fields = '__all__'

class apartment_complaints_serializer(serializers.ModelSerializer):
    class Meta:
        model = apartment_complaints
        fields = '__all__'
