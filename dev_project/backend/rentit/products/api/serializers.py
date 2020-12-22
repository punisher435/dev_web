from products.models import rooms,room_rating_and_reviews
from rest_framework import serializers


class room_detail_serializer(serializers.ModelSerializer):
    class Meta:
        model = rooms
        exclude = ('date_added','date_verified','removed',)

class room_list_serializer(serializers.ModelSerializer):
    class Meta:
        model = rooms
        fields = ['room_id','category','location','city','state','country','pincode','price','owner_discount','company_discount','final_price','furniture','capacity','trust_points','photo1','booked','facility','avg_rating']


class room_rating_and_reviews_serializer(serializers.ModelSerializer):
    class Meta:
        model = room_rating_and_reviews
        fields = '__all__'