from products.models import rooms,room_rating_and_reviews,shops,shop_rating_and_reviews,apartments,apartment_rating_and_reviews
from rest_framework import serializers


#rooms

class room_detail_serializer(serializers.ModelSerializer):
    class Meta:
        model = rooms
        fields ='__all__'

class room_list_serializer(serializers.ModelSerializer):
    class Meta:
        model = rooms
        fields ='__all__'

class room_rating_and_reviews_serializer(serializers.ModelSerializer):
    class Meta:
        model = room_rating_and_reviews
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