from rest_framework import serializers
from customer.models import customer,customer_details

class customer_serializer(serializers.ModelSerializer):
    class Meta:
        model = customer
        fields = ('first_name','last_name','email','mobile','customer_id')


class customer_details_serializer(serializers.ModelSerializer):
    class Meta:
        model = customer_details
        fields = ('aadhar','alternate_mobile','photo','customer_details_id')




