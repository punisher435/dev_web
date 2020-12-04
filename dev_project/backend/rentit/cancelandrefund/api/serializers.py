from rest_framework import serializers
from cancelandrefund.models import refund_room,refund_shop,refund_apartment

class refund_room_serializer(serializers.ModelSerializer):
    class Meta:
        model = refund_room
        fields = ('refund_request_date','payment_status','refund_receipt','refund_amount')

class refund_shop_serializer(serializers.ModelSerializer):
    class Meta:
        model = refund_shop
        fields = ('refund_request_date','payment_status','refund_receipt','refund_amount')

class refund_apartment_serializer(serializers.ModelSerializer):
    class Meta:
        model = refund_apartment
        fields = ('refund_request_date','payment_status','refund_receipt','refund_amount')