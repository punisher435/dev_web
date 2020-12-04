from rest_framework import serializers
from cartandwish.models import cart,wishlist

class cart_serializer(serializers.ModelSerializer):
    class Meta:
        model = cart
        fields = ('product_type','portion')

class wishlist_serializer(serializers.ModelSerializer):
    class Meta:
        model = wishlist
        fields = ('product_type')