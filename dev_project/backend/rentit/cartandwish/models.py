from django.db import models
from customer.models import customer
from products.models import rooms,shops,apartments

# Create your models here.

class cart(models.Model):
    product_type_list=[
          ('room','Room'),
          ('shop','Shop'),
          ('apartment','Apartment')
     ]

    customer_id = models.ForeignKey(customer,on_delete=models.CASCADE)
    product_type=models.CharField( max_length=255,choices=product_type_list)
    room_id=models.ForeignKey(rooms, on_delete=models.CASCADE,blank=True)
    shop_id=models.ForeignKey(shops, on_delete=models.CASCADE,blank=True)
    apartment_id=models.ForeignKey(apartments, on_delete=models.CASCADE,blank=True)
    portion=models.IntegerField()

class wishlist(models.Model):
    product_type_list=[
          ('room','Room'),
          ('shop','Shop'),
          ('apartment','Apartment')
     ]

    customer_id = models.ForeignKey(customer,on_delete=models.CASCADE)
    product_type=models.CharField( max_length=255,choices=product_type_list)
    room_id=models.ForeignKey(rooms, on_delete=models.CASCADE,blank=True)
    shop_id=models.ForeignKey(shops, on_delete=models.CASCADE,blank=True)
    apartment_id=models.ForeignKey(apartments, on_delete=models.CASCADE,blank=True)





