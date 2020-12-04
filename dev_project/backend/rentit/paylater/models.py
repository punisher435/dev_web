from django.db import models
import uuid
from customer.models import customer
from products.models import rooms,shops,apartments
from seller.models import seller

# Create your models here.


class paylater_request(models.Model):
    request_status_choices=[
          ('accepted','Aceepted'),
          ('declined','Declined'),
          ('pending','Pending'),
     ]
    product_type_list=[
          ('room','Room'),
          ('shop','Shop'),
          ('apartment','Apartment')
     ]

    paylater_request_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    customer_id = models.ForeignKey(customer,on_delete=models.PROTECT)
    product_type=models.CharField( max_length=255,choices=product_type_list)
    room_id=models.ForeignKey(rooms, on_delete=models.PROTECT,blank=True)
    shop_id=models.ForeignKey(shops, on_delete=models.PROTECT,blank=True)
    apartment_id=models.ForeignKey(apartments, on_delete=models.PROTECT,blank=True)
    admin_status=models.CharField( max_length=255,choices=request_status_choices)
    seller_status=models.CharField( max_length=255,choices=request_status_choices)
    seller_id = models.ForeignKey(seller, on_delete=models.PROTECT)
    request_date=models.DateTimeField(auto_now_add=True)
    cancelled=models.BooleanField(default=False)


class paylater(models.Model):
    payment_status_choices=[
          ('paid','Paid'),
          ('pending','Pending')
     ]
    product_type_list=[
          ('room','Room'),
          ('shop','Shop'),
          ('apartment','Apartment')
     ]

    paylater_request_id=models.ForeignKey(paylater_request, on_delete=models.PROTECT)
    customer_id = models.ForeignKey(customer,on_delete=models.PROTECT)
    product_type=models.CharField( max_length=255,choices=product_type_list)
    room_id=models.ForeignKey(rooms, on_delete=models.PROTECT,blank=True)
    shop_id=models.ForeignKey(shops, on_delete=models.PROTECT,blank=True)
    apartment_id=models.ForeignKey(apartments, on_delete=models.PROTECT,blank=True)
    seller_id = models.ForeignKey(seller, on_delete=models.PROTECT)
    request_accepted_date=models.DateTimeField(auto_now_add=True)
    due_date=models.DateField()
    payment_status=models.CharField( max_length=255,choices=payment_status_choices)