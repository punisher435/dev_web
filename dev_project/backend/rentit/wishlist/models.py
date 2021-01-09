from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
from products.models import rooms,shops,apartments

class wishlist(models.Model):
    user_id = models.OneToOneField(User,on_delete=models.CASCADE,primary_key=True)
    room_wishlist = models.ManyToManyField(rooms,blank=True,related_name='wishlist_room')
    shop_wishlist = models.ManyToManyField(shops, blank=True,related_name='wishlist_shop')
    apartment_wishlist = models.ManyToManyField(apartments, blank=True,related_name='wishlist_apartment')
