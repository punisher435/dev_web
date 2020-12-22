from products.models import rooms,room_rating_and_reviews,shops,shop_rating_and_reviews,apartments,apartment_rating_and_reviews
from rest_framework import serializers


#rooms

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


#shops

class shop_detail_serializer(serializers.ModelSerializer):
    class Meta:
        model = shops
        exclude = ('date_added','date_verified','removed',)

class shop_list_serializer(serializers.ModelSerializer):
    class Meta:
        model = shops
        fields = ['room_id','category','location','city','state','country','pincode','price','owner_discount','company_discount','final_price','furniture','trust_points','photo1','booked','facility','avg_rating']


class shop_rating_and_reviews_serializer(serializers.ModelSerializer):
    class Meta:
        model = shop_rating_and_reviews
        fields = '__all__'



#apartments

class apartment_detail_serializer(serializers.ModelSerializer):
    class Meta:
        model = apartments
        exclude = ('date_added','date_verified','removed',)

class apartment_list_serializer(serializers.ModelSerializer):
    class Meta:
        model = apartments
        fields = ['room_id','category','location','city','state','country','pincode','price','owner_discount','company_discount','final_price','furniture','BHK','trust_points','photo1','booked','facility','avg_rating']


class apartment_rating_and_reviews_serializer(serializers.ModelSerializer):
    class Meta:
        model = apartment_rating_and_reviews
        fields = '__all__'