from django.db import models
import uuid

# Create your models here

class customer(models.Model):
    customer_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    first_name=models.CharField(max_length=255)
    last_name=models.CharField(max_length=255)
    email=models.EmailField(unique=True)
    password=models.CharField(max_length=255)
    mobile=models.BigIntegerField(unique=True)
    date_jointed=models.DateTimeField(auto_now_add=True)
    removed=models.BooleanField(default=False)

class customer_details(models.Model):
    customer_details_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    customer_id=models.ForeignKey(customer,on_delete=models.CASCADE)
    aadhar=models.PositiveBigIntegerField()
    alternate_mobile=models.BigIntegerField(unique=True)
    photo=models.ImageField(upload_to='images/profile_pics/customer',blank=True)
    
    