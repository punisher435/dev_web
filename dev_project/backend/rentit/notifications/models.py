from django.db import models
from customer.models import customer
from seller.models import seller
from adminuser.models import admin_user

# Create your models here.

class notifications_customer(models.Model):
    customer_id = models.ForeignKey(customer,on_delete=models.CASCADE)
    content=models.TextField()
    timestamp=models.DateTimeField(auto_now_add=True)
    new=models.BooleanField(default=True)

class notifications_seller(models.Model):
    seller_id = models.ForeignKey(seller,on_delete=models.CASCADE)
    content=models.TextField()
    timestamp=models.DateTimeField(auto_now_add=True)
    new=models.BooleanField(default=True)

class notifications_admin(models.Model):
    admin_id = models.ForeignKey(admin_user,on_delete=models.CASCADE)
    content=models.TextField()
    timestamp=models.DateTimeField(auto_now_add=True)
    new=models.BooleanField(default=True)