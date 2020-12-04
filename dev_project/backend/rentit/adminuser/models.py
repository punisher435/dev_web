from django.db import models
import uuid

# Create your models here.


class admin_user(models.Model):
    admin_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    username = models.CharField( max_length=255,unique=True)
    first_name=models.CharField(max_length=255)
    last_name=models.CharField(max_length=255)
    email=models.EmailField(unique=True)
    password=models.CharField(max_length=255)
    mobile=models.PositiveBigIntegerField(unique=True)
    date_joined=models.DateTimeField(auto_now_add=True)
    removed=models.BooleanField(default=False)

