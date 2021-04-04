from django.db import models
from products.models import rooms,shops,apartments
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

import uuid

user=get_user_model()

# Create your models here.

def upload_to_room_complaint(instance, filename):
    return 'complaints/rooms/{filename}'.format(filename=filename)

class room_complaints(models.Model):
    complaint_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)

    room_id = models.ForeignKey(rooms,on_delete=models.PROTECT,related_name="complaint_room_id")
    room_name = models.CharField(max_length=255)
    customer_id= models.ForeignKey(user,on_delete=models.PROTECT,related_name="complaint_room_customer_id")
    customer_name = models.CharField(max_length=255)
    seller_id = models.ForeignKey(user,on_delete=models.PROTECT,related_name="complaint_room_seller_id")
    seller_name = models.CharField(max_length=255)

    customer_contact = models.CharField(max_length=255)
    seller_contact = models.CharField(max_length=255)

    created_at = models.DateTimeField(auto_now_add=True)

    subject = models.CharField(max_length=255)
    message = models.TextField()
    photo1=models.ImageField(_("Image"),upload_to=upload_to_room_complaint,null=True,blank=True)

    reply = models.TextField(null=True,blank=True)

    customer_fullfilled = models.BooleanField(default=False)
    seller_fullfilled = models.BooleanField(default=False)

