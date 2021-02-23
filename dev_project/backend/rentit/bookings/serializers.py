from .models import roomBookings,room_rating_and_reviews,shop_rating_and_reviews,apartment_rating_and_reviews
from .models import shopBookings,apartmentBookings
from rest_framework import serializers


class roomBookingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = roomBookings
        fields = '__all__'

class room_rating_and_reviews_serializer(serializers.ModelSerializer):
    class Meta:
        model = room_rating_and_reviews
        fields = '__all__'

class shop_rating_and_reviews_serializer(serializers.ModelSerializer):
    class Meta:
        model = shop_rating_and_reviews
        fields = '__all__'

class apartment_rating_and_reviews_serializer(serializers.ModelSerializer):
    class Meta:
        model = apartment_rating_and_reviews
        fields = '__all__'


class shopBookingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = shopBookings
        fields = '__all__'

class apartmentBookingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = apartmentBookings
        fields = '__all__'