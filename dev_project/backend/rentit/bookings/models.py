from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

import uuid

# Create your models here.

user=get_user_model()

from products.models import rooms,shops,apartments
from .managers import rooms_bookings_manager,rooms_seller_bookings_manager
from .managers import shops_bookings_manager,shops_seller_bookings_manager
from .managers import apartments_bookings_manager,apartments_seller_bookings_manager

class roomBookings(models.Model):

    booking_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    room_id = models.ForeignKey(rooms,on_delete=models.PROTECT,related_name="booked_room_id")
    customer_id= models.ForeignKey(user,on_delete=models.PROTECT,related_name="room_customer_id")
    seller_id= models.ForeignKey(user,on_delete=models.PROTECT,related_name="room_seller_id")

    created_at = models.DateTimeField(auto_now_add=True)

    booked_from = models.DateField()
    booked_till = models.DateField()

    duration=models.IntegerField()

    currency=models.CharField(max_length=255)
    cost=models.BigIntegerField()
    price_to_be_paid=models.BigIntegerField()
    discount=models.IntegerField()

    paid = models.BooleanField(default=True)

    invoice = models.FileField(upload_to ='invoices/% Y/% m/% d/',null=True) 
    paylater_receipt = models.FileField(upload_to ='paylater_receipts/% Y/% m/% d/',null=True) 

    cancelled=models.BooleanField(default=False)
    refunded=models.BooleanField(default=False)
    paylater=models.BooleanField(default=False)
    paylater_date=models.DateField(_("Pay Later Date"),null=True,blank=True)
    removed=models.BooleanField(default=False)

    customer = rooms_bookings_manager
    seller = rooms_seller_bookings_manager


class shopBookings(models.Model):
    
    booking_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    shop_id = models.ForeignKey(shops,on_delete=models.PROTECT,related_name="booked_shop_id")
    customer_id= models.ForeignKey(user,on_delete=models.PROTECT,related_name="shop_customer_id")
    seller_id= models.ForeignKey(user,on_delete=models.PROTECT,related_name="shop_seller_id")

    created_at = models.DateTimeField(auto_now_add=True)

    booked_from = models.DateField()
    booked_till = models.DateField()

    duration=models.IntegerField()

    currency=models.CharField(max_length=255)
    cost=models.BigIntegerField()
    price_to_be_paid=models.BigIntegerField()
    discount=models.IntegerField()

    paid = models.BooleanField(default=True)

    invoice = models.FileField(upload_to ='invoices/% Y/% m/% d/',null=True) 
    paylater_receipt = models.FileField(upload_to ='paylater_receipts/% Y/% m/% d/',null=True) 

    cancelled=models.BooleanField(default=False)
    refunded=models.BooleanField(default=False)
    paylater=models.BooleanField(default=False)
    paylater_date=models.DateField(_("Pay Later Date"),null=True,blank=True)
    removed=models.BooleanField(default=False)

    customer = shops_bookings_manager
    seller = shops_seller_bookings_manager



class apartmentBookings(models.Model):
    
    booking_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    apartment_id = models.ForeignKey(apartments,on_delete=models.PROTECT,related_name="booked_apartment_id")
    customer_id= models.ForeignKey(user,on_delete=models.PROTECT,related_name="apartment_customer_id")
    seller_id= models.ForeignKey(user,on_delete=models.PROTECT,related_name="apartment_seller_id")

    created_at = models.DateTimeField(auto_now_add=True)

    booked_from = models.DateField()
    booked_till = models.DateField()

    duration=models.IntegerField()

    currency=models.CharField(max_length=255)
    cost=models.BigIntegerField()
    price_to_be_paid=models.BigIntegerField()
    discount=models.IntegerField()

    paid = models.BooleanField(default=True)

    invoice = models.FileField(upload_to ='invoices/% Y/% m/% d/',null=True) 
    paylater_receipt = models.FileField(upload_to ='paylater_receipts/% Y/% m/% d/',null=True) 

    cancelled=models.BooleanField(default=False)
    refunded=models.BooleanField(default=False)
    paylater=models.BooleanField(default=False)
    paylater_date=models.DateField(_("Pay Later Date"),null=True,blank=True)
    removed=models.BooleanField(default=False)

    customer = apartments_bookings_manager
    seller = apartments_seller_bookings_manager






