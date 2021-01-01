from bookings.models import roomBookings, shopBookings, apartmentBookings
from rest_framework import serializers


class roomBookingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = roomBookings
        fields = '__all__'

class shopBookingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = shopBookings
        fields = '__all__'

class apartmentBookingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = apartmentBookings
        fields = '__all__'