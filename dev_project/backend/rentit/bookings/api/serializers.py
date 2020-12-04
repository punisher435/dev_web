from rest_framework import serializers
from bookings.models import room_bookings,room_bookings_history,shop_bookings,shop_bookings_history,apartment_bookings,apartment_bookings_history

class room_bookings_serializer(serializers.ModelSerializer):
    class Meta:
        model = room_bookings
        fields = ('portion','booking_from','booking_till','due_payment_seller','invoice','date_booked','booking_type','cancelled')

class room_bookings_history_serializer(serializers.ModelSerializer):
    class Meta:
        model = room_bookings_history
        fields = ('portion','booking_from','booking_till','due_payment_seller','invoice','date_booked','booking_type','cancelled')


class shop_bookings_serializer(serializers.ModelSerializer):
    class Meta:
        model = shop_bookings
        fields = ('booking_from','booking_till','due_payment_seller','invoice','date_booked','booking_type','cancelled')

class shop_bookings_history_serializer(serializers.ModelSerializer):
    class Meta:
        model = shop_bookings_history
        fields = ('booking_from','booking_till','due_payment_seller','invoice','date_booked','booking_type','cancelled')


class apartment_bookings_serializer(serializers.ModelSerializer):
    class Meta:
        model = apartment_bookings
        fields = ('booking_from','booking_till','due_payment_seller','invoice','date_booked','booking_type','cancelled')

class apartment_bookings_history_serializer(serializers.ModelSerializer):
    class Meta:
        model = apartment_bookings_history
        fields = ('booking_from','booking_till','due_payment_seller','invoice','date_booked','booking_type','cancelled')