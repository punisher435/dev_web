from rest_framework import serializers
from user.models import customUser_profile,seller_bank_details,seller_address

class profile_serializer(serializers.ModelSerializer):
    class Meta:
        model = customUser_profile
        fields='__all__' 


class seller_bank_serializer(serializers.ModelSerializer):
    class Meta:
        model = seller_bank_details
        fields='__all__'

class seller_address_serializer(serializers.ModelSerializer):
    class Meta:
        model = seller_address
        fields='__all__'