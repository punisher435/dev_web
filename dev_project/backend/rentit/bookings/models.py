from django.db import models
import uuid
from customer.models import customer
from seller.models import seller
from products.models import rooms,shops,apartments

# Create your models here.

class room_bookings(models.Model):
    booking_type_choices=[
          ('physical','Physical'),
          ('online','Online')
     ]

    booking_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    room_id =models.ForeignKey(rooms,on_delete=models.PROTECT)
    seller_id = models.ForeignKey(seller, on_delete=models.PROTECT)
    portion = models.IntegerField()
    booking_from=models.DateField()
    booking_till=models.DateField()
    due_payment_seller=models.BigIntegerField()
    invoice= models.FileField(upload_to ='invoices/rooms/% Y/% m/% d/')
    date_booked=models.DateTimeField(auto_now_add=True)
    customer_id=models.ForeignKey(customer,on_delete=models.PROTECT)
    booking_type=models.CharField( max_length=255,choices=booking_type_choices)
    cancelled=models.BooleanField(default=False)

class room_bookings_history(models.Model):
    booking_type_choices=[
        ('physical','Physical'),
        ('online','Online')
    ]

    booking_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    room_id =models.ForeignKey(rooms,on_delete=models.PROTECT)
    seller_id = models.ForeignKey(seller, on_delete=models.PROTECT)
    portion = models.IntegerField()
    booking_from=models.DateField()
    booking_till=models.DateField()
    due_payment_seller=models.BigIntegerField()
    invoice= models.FileField(upload_to ='invoices/rooms/% Y/% m/% d/')
    date_booked=models.DateTimeField(auto_now_add=True)
    customer_id=models.ForeignKey(customer,on_delete=models.PROTECT)
    booking_type=models.CharField( max_length=255,choices=booking_type_choices)
    cancelled=models.BooleanField(default=False)


class shop_bookings(models.Model):
    booking_type_choices=[
          ('physical','Physical'),
          ('online','Online')
     ]

    booking_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    shop_id =models.ForeignKey(shops,on_delete=models.PROTECT)
    seller_id = models.ForeignKey(seller, on_delete=models.PROTECT)
    booking_from=models.DateField()
    booking_till=models.DateField()
    due_payment_seller=models.BigIntegerField()
    invoice= models.FileField(upload_to ='invoices/shops/% Y/% m/% d/')
    date_booked=models.DateTimeField(auto_now_add=True)
    customer_id=models.ForeignKey(customer,on_delete=models.PROTECT)
    booking_type=models.CharField( max_length=255,choices=booking_type_choices)
    cancelled=models.BooleanField(default=False)

class shop_bookings_history(models.Model):
    booking_type_choices=[
        ('physical','Physical'),
        ('online','Online')
    ]

    booking_id = models.UUIDField( 
            primary_key = True, 
            default = uuid.uuid4, 
            editable = False,
            unique = True)
    shop_id =models.ForeignKey(shops,on_delete=models.PROTECT)
    seller_id = models.ForeignKey(seller, on_delete=models.PROTECT)
    booking_from=models.DateField()
    booking_till=models.DateField()
    due_payment_seller=models.BigIntegerField()
    invoice= models.FileField(upload_to ='invoices/shops/% Y/% m/% d/')
    date_booked=models.DateTimeField(auto_now_add=True)
    customer_id=models.ForeignKey(customer,on_delete=models.PROTECT)
    booking_type=models.CharField( max_length=255,choices=booking_type_choices)
    cancelled=models.BooleanField(default=False)


class apartment_bookings(models.Model):
    booking_type_choices=[
          ('physical','Physical'),
          ('online','Online')
     ]

    booking_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    apartment_id =models.ForeignKey(apartments,on_delete=models.PROTECT)
    seller_id = models.ForeignKey(seller, on_delete=models.PROTECT)
    booking_from=models.DateField()
    booking_till=models.DateField()
    due_payment_seller=models.BigIntegerField()
    invoice= models.FileField(upload_to ='invoices/apartments/% Y/% m/% d/')
    date_booked=models.DateTimeField(auto_now_add=True)
    customer_id=models.ForeignKey(customer,on_delete=models.PROTECT)
    booking_type=models.CharField( max_length=255,choices=booking_type_choices)
    cancelled=models.BooleanField(default=False)

class apartment_bookings_history(models.Model):
    booking_type_choices=[
        ('physical','Physical'),
        ('online','Online')
    ]

    booking_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    apartment_id =models.ForeignKey(apartments,on_delete=models.PROTECT)
    seller_id = models.ForeignKey(seller, on_delete=models.PROTECT)
    portion = models.IntegerField()
    booking_from=models.DateField()
    booking_till=models.DateField()
    due_payment_seller=models.BigIntegerField()
    invoice= models.FileField(upload_to ='invoices/apartments/% Y/% m/% d/')
    date_booked=models.DateTimeField(auto_now_add=True)
    customer_id=models.ForeignKey(customer,on_delete=models.PROTECT)
    booking_type=models.CharField( max_length=255,choices=booking_type_choices)
    cancelled=models.BooleanField(default=False)