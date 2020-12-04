from rest_framework import serializers
from products.models import rooms,room_facility,room_rating_and_reviews,shops,shop_facility,shop_rating_and_reviews,apartments,apartment_facility,apartment_rating_and_reviews

class rooms_serializer(serializers.ModelSerializer):
    class Meta:
        model = rooms
        fields = ('price','discount_price','length','breadth','height','furniture','verified','capacity','trust_points','date_added','date_verified','images')

class room_facility_serializer(serializers.ModelSerializer):
    class Meta:
        model = room_facility
        fields = ('facilities')


class room_rating_and_reviews_serializer(serializers.ModelSerializer):
    class Meta:
        model = room_rating_and_reviews
        fields = ('rating','reviews','timestamp')


class shops_serializer(serializers.ModelSerializer):
    class Meta:
        model = shops
        fields = ('price','discount_price','length','breadth','height','furniture','verified','trust_points','date_added','date_verified','images')

class shop_facility_serializer(serializers.ModelSerializer):
    class Meta:
        model = shop_facility
        fields = ('facilities')


class shop_rating_and_reviews_serializer(serializers.ModelSerializer):
    class Meta:
        model = shop_rating_and_reviews
        fields = ('rating','reviews','timestamp')


class apartments_serializer(serializers.ModelSerializer):
    class Meta:
        model = apartments
        fields = ('price','discount_price','length','breadth','height','furniture','verified','BHK','trust_points','date_added','date_verified','images')

class apartment_facility_serializer(serializers.ModelSerializer):
    class Meta:
        model = apartment_facility
        fields = ('facilities')


class apartment_rating_and_reviews_serializer(serializers.ModelSerializer):
    class Meta:
        model = apartment_rating_and_reviews
        fields = ('rating','reviews','timestamp')