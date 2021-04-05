from django.db import models
from products.models import rooms,shops,apartments
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

import uuid

user=get_user_model()

# Create your models here.




def upload_to_me(instance, filename):
    return 'complaints/me/{filename}'.format(filename=filename)



class message_class(models.Model):

    sender_id= models.ForeignKey(user,on_delete=models.PROTECT,related_name="message_sender_id")
    receiver_id = models.ManyToManyField(user,related_name="message_receiver")
    created_at = models.DateTimeField(auto_now_add=True)
    message = models.TextField(null=True,blank=True)
    photo=models.ImageField(_("Image"),upload_to=upload_to_me,null=True,blank=True)





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
    seller_id = models.ManyToManyField(user,related_name="room_id_seller")
    

    customer_contact = models.CharField(max_length=255)
  

    created_at = models.DateTimeField(auto_now_add=True)

    subject = models.CharField(max_length=255)
    message = models.TextField()
    photo1=models.ImageField(_("Image"),upload_to=upload_to_room_complaint,null=True,blank=True)

    messages = models.ManyToManyField(message_class,related_name="room_message")

    

    customer_fullfilled = models.BooleanField(default=False)
    seller_fullfilled = models.BooleanField(default=False)


def upload_to_shop_complaint(instance, filename):
    return 'complaints/shops/{filename}'.format(filename=filename)

class shop_complaints(models.Model):
    complaint_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)

    shop_id = models.ForeignKey(shops,on_delete=models.PROTECT,related_name="complaint_shop_id")
    shop_name = models.CharField(max_length=255)
    customer_id= models.ForeignKey(user,on_delete=models.PROTECT,related_name="complaint_shop_customer_id")
    customer_name = models.CharField(max_length=255)
    seller_id = models.ManyToManyField(user,related_name="shop_id_seller")
   

    customer_contact = models.CharField(max_length=255)
   

    created_at = models.DateTimeField(auto_now_add=True)
    messages = models.ManyToManyField(message_class,related_name="shop_message")

    subject = models.CharField(max_length=255)
    message = models.TextField()
    photo1=models.ImageField(_("Image"),upload_to=upload_to_shop_complaint,null=True,blank=True)

    

    customer_fullfilled = models.BooleanField(default=False)
    seller_fullfilled = models.BooleanField(default=False)


def upload_to_apartment_complaint(instance, filename):
    return 'complaints/apartments/{filename}'.format(filename=filename)

class apartment_complaints(models.Model):
    complaint_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)

    apartment_id = models.ForeignKey(apartments,on_delete=models.PROTECT,related_name="complaint_apartment_id")
    apartment_name = models.CharField(max_length=255)
    customer_id= models.ForeignKey(user,on_delete=models.PROTECT,related_name="complaint_apartment_customer_id")
    customer_name = models.CharField(max_length=255)
    seller_id = models.ManyToManyField(user,related_name="apartment_id_seller")
    

    customer_contact = models.CharField(max_length=255)
    

    created_at = models.DateTimeField(auto_now_add=True)
    messages = models.ManyToManyField(message_class,related_name="apartment_message")

    subject = models.CharField(max_length=255)
    message = models.TextField()
    photo1=models.ImageField(_("Image"),upload_to=upload_to_apartment_complaint,null=True,blank=True)

    

    customer_fullfilled = models.BooleanField(default=False)
    seller_fullfilled = models.BooleanField(default=False)







