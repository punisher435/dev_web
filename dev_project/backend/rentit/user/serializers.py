from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
User = get_user_model()
from .models import seller_rating_and_reviews
from rest_framework import serializers


class UsersCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('email','first_name','last_name','is_superuser','is_staff','is_seller','gender','password','profile_completed','bank_completed','address_completed')


class Seller_rating_and_reviews_serializer(serializers.ModelSerializer):
    class Meta:
        model = seller_rating_and_reviews
        fields ='__all__'