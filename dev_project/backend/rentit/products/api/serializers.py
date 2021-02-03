from products.models import rooms,room_rating_and_reviews,shops,shop_rating_and_reviews,apartments,apartment_rating_and_reviews
from rest_framework import serializers
from products.models import minmax_room,minmax_shop,minmax_apartment

#rooms

class room_detail_serializer(serializers.ModelSerializer):
    class Meta:
        model = rooms
        fields ='__all__'

class room_location(serializers.ModelSerializer):
    class Meta:
        model = rooms
        fields = ['latitude','longitude','room_id','category']


class room_list_serializer(serializers.ModelSerializer):
    class Meta:
        model = rooms
        fields ='__all__'

class room_rating_and_reviews_serializer(serializers.ModelSerializer):
    class Meta:
        model = room_rating_and_reviews
        fields = '__all__'

class minmax_room_serializer(serializers.ModelSerializer):
    class Meta:
        model = minmax_room
        fields = '__all__'


#shops

class shop_detail_serializer(serializers.ModelSerializer):
    class Meta:
        model = shops
        fields ='__all__'

class shop_list_serializer(serializers.ModelSerializer):
    class Meta:
        model = shops
        fields ='__all__'

class shop_rating_and_reviews_serializer(serializers.ModelSerializer):
    class Meta:
        model = shop_rating_and_reviews
        fields = '__all__'

class minmax_shop_serializer(serializers.ModelSerializer):
    class Meta:
        model = minmax_shop
        fields = '__all__'



#apartments

class apartment_detail_serializer(serializers.ModelSerializer):
    class Meta:
        model = apartments
        fields ='__all__'

class apartment_list_serializer(serializers.ModelSerializer):
    class Meta:
        model = apartments
        fields ='__all__'

class apartment_rating_and_reviews_serializer(serializers.ModelSerializer):
    class Meta:
        model = apartment_rating_and_reviews
        fields = '__all__'

class minmax_apartment_serializer(serializers.ModelSerializer):
    class Meta:
        model = minmax_apartment
        fields = '__all__'