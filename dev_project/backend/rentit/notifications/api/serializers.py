from rest_framework import serializers
from notifications.models import notifications_admin,notifications_customer,notifications_seller

class notifications_customer_serializer(serializers.ModelSerializer):
    class Meta:
        model = notifications_customer
        fields = ('content','timestamp','new')

class notifications_seller_serializer(serializers.ModelSerializer):
    class Meta:
        model = notifications_seller
        fields = ('content','timestamp','new')

class notifications_admin_serializer(serializers.ModelSerializer):
    class Meta:
        model = notifications_admin
        fields = ('content','timestamp','new')

