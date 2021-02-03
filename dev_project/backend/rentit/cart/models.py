from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
from products.models import rooms,shops,apartments

class cart(models.Model):
    user_id = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True)
    room_cart = models.ManyToManyField(rooms,blank=True,related_name='cart_room')
    shop_cart = models.ManyToManyField(shops, blank=True,related_name='cart_shop')
    apartment_cart = models.ManyToManyField(apartments, blank=True,related_name='cart_apartment')
    items = models.IntegerField(default=0)
