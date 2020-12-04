from django.db import models
import uuid
from customer.models import customer
from products.models import rooms,shops,apartments
from seller.models import seller

# Create your models here.

class refund_room(models.Model):
    payment_status_choices=[
          ('paid','Paid'),
          ('pending','Pending')
     ]

    refund_id = models.UUIDField( 
        primary_key = True, 
        default = uuid.uuid4, 
        editable = False,
        unique = True)
    customer_id=models.ForeignKey(customer,on_delete=models.PROTECT)
    room_id=models.ForeignKey(rooms, on_delete=models.PROTECT)
    refund_request_date=models.DateTimeField(auto_now_add=True)
    payment_status=models.CharField( max_length=255,choices=payment_status_choices)
    refund_receipt= models.FileField(upload_to ='refund_receipt/rooms/% Y/% m/% d/')
    refund_amount=models.BigIntegerField()
    seller_id=models.ForeignKey(seller, on_delete=models.PROTECT)

class refund_shop(models.Model):
    payment_status_choices=[
          ('paid','Paid'),
          ('pending','Pending')
     ]

    refund_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    customer_id=models.ForeignKey(customer,on_delete=models.PROTECT)
    shop_id=models.ForeignKey(shops, on_delete=models.PROTECT)
    refund_request_date=models.DateTimeField(auto_now_add=True)
    payment_status=models.CharField( max_length=255,choices=payment_status_choices)
    refund_receipt= models.FileField(upload_to ='refund_receipt/shops/% Y/% m/% d/')
    refund_amount=models.BigIntegerField()
    seller_id=models.ForeignKey(seller, on_delete=models.PROTECT)

class refund_apartment(models.Model):
    payment_status_choices=[
          ('paid','Paid'),
          ('pending','Pending')
     ]

    refund_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    customer_id=models.ForeignKey(customer,on_delete=models.PROTECT)
    apartment_id=models.ForeignKey(apartments, on_delete=models.PROTECT)
    refund_request_date=models.DateTimeField(auto_now_add=True)
    payment_status=models.CharField( max_length=255,choices=payment_status_choices)
    refund_receipt= models.FileField(upload_to ='refund_receipt/apartments/% Y/% m/% d/')
    refund_amount=models.BigIntegerField()
    seller_id=models.ForeignKey(seller, on_delete=models.PROTECT)

