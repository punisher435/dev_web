from django.db import models
from customer.models import customer
import uuid

# Create your models here.

class seller(models.Model):
     seller_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
     first_name=models.CharField(max_length=255)
     last_name=models.CharField(max_length=255)
     email=models.EmailField(unique=True)
     password=models.CharField(max_length=255)
     mobile=models.PositiveBigIntegerField(unique=True)
     date_joined=models.DateTimeField(auto_now_add=True)
     removed=models.BooleanField(default=False)

class seller_details(models.Model):
     seller_details_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
     seller_details_id=models.ForeignKey(seller,on_delete=models.CASCADE)
     aadhar=models.PositiveBigIntegerField()
     alternate_mobile=models.PositiveBigIntegerField(unique=True)
     photo=models.ImageField(upload_to='images/profile_pics/seller',blank=True)


class seller_bank_details(models.Model):
     account_type_choices=[
          ('savings','Savings'),
          ('current','Current')
     ]
     aadhar=models.PositiveBigIntegerField()
    
     bank_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
     seller_id=models.ForeignKey(seller,on_delete=models.CASCADE)
     account_no = models.BigIntegerField()
     bank_name=models.CharField(max_length=255)
     bank_address=models.TextField()
     IFSC_code=models.CharField(max_length=255)
     account_type=models.CharField( max_length=255,choices=account_type_choices)
     total_due_payment=models.BigIntegerField()

class seller_rating_and_reviews(models.Model):
     seller_id=models.ForeignKey(seller,on_delete=models.PROTECT)
     customer_id=models.ForeignKey(customer,on_delete=models.PROTECT)
     rating=models.DecimalField(max_digits=4,decimal_places=2)
     reviews=models.TextField()
     timestamp=models.DateTimeField(auto_now=True)     
     