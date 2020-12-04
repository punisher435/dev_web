from rest_framework import serializers
from seller.models import seller,seller_details

class seller_serializer(serializers.ModelSerializer):
    class Meta:
        model = seller
        fields = ('first_name','last_name','email','mobile')


class seller_details_serializer(serializers.ModelSerializer):
    class Meta:
        model = seller_details
        fields = ('aadhar','alternate_mobile','photo')
