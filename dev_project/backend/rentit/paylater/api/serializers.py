from rest_framework import serializers
from paylater.models import paylater_request,paylater

class paylater_request_serializer(serializers.ModelSerializer):
    class Meta:
        model = paylater_request
        fields = ('product_type','admin_status','seller_status','request_date','cancelled')

class paylater_serializer(serializers.ModelSerializer):
    class Meta:
        model = paylater
        fields = ('product_type','admin_status','seller_status','request_accepted_date','due_date','payment_status')