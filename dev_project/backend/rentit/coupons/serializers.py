from rest_framework import serializers

from .models import coupons

class coupon_serializer(serializers.ModelSerializer):
    class Meta:
        model = coupons
        fields = '__all__'