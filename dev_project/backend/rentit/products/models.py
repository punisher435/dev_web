from django.db import models
import uuid
from seller.models import seller 
from customer.models import customer

# Create your models here.

class rooms(models.Model):
    room_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    seller_id = models.ForeignKey(seller, on_delete=models.CASCADE)
    price=models.IntegerField()
    discount_price=models.IntegerField()
    length=models.IntegerField()
    breadth=models.IntegerField()
    height=models.IntegerField()
    furniture=models.TextField()
    verified=models.BooleanField(default=False)
    capacity=models.IntegerField()
    trust_points=models.BigIntegerField()
    date_added=models.DateTimeField(auto_now_add=True)
    date_verified=models.DateTimeField()
    images=models.ImageField(upload_to='images/rooms',blank=False)


class room_facility(models.Model):
    room_id = models.ForeignKey(rooms,on_delete=models.CASCADE)
    facilities=models.TextField()


class room_rating_and_reviews(models.Model):
    room_id=models.ForeignKey(rooms,on_delete=models.PROTECT)
    customer_id=models.ForeignKey(customer,on_delete=models.PROTECT)
    rating=models.DecimalField(max_digits=4,decimal_places=2)
    reviews=models.TextField()
    timestamp=models.DateTimeField(auto_now=True)  



class shops(models.Model):
    shop_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    seller_id = models.ForeignKey(seller, on_delete=models.CASCADE)
    price=models.IntegerField()
    discount_price=models.IntegerField()
    length=models.IntegerField()
    breadth=models.IntegerField()
    height=models.IntegerField()
    furniture=models.TextField()
    verified=models.BooleanField(default=False)
    trust_points=models.BigIntegerField()
    date_added=models.DateTimeField(auto_now_add=True)
    date_verified=models.DateTimeField()
    images=models.ImageField(upload_to='images/shops',blank=False)


class shop_facility(models.Model):
    shop_id = models.ForeignKey(shops,on_delete=models.CASCADE)
    facilities=models.TextField()


class shop_rating_and_reviews(models.Model):
    shop_id=models.ForeignKey(shops,on_delete=models.PROTECT)
    customer_id=models.ForeignKey(customer,on_delete=models.PROTECT)
    rating=models.DecimalField(max_digits=4,decimal_places=2)
    reviews=models.TextField()
    timestamp=models.DateTimeField(auto_now=True)  


class apartments(models.Model):
    apartment_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    seller_id = models.ForeignKey(seller, on_delete=models.CASCADE)
    price=models.IntegerField()
    discount_price=models.IntegerField()
    length=models.IntegerField()
    breadth=models.IntegerField()
    height=models.IntegerField()
    furniture=models.TextField()
    verified=models.BooleanField(default=False)
    BHK=models.IntegerField()
    trust_points=models.BigIntegerField()
    date_added=models.DateTimeField(auto_now_add=True)
    date_verified=models.DateTimeField()
    images=models.ImageField(upload_to='images/apartments',blank=False)


class apartment_facility(models.Model):
    apartment_id = models.ForeignKey(apartments,on_delete=models.CASCADE)
    facilities=models.TextField()


class apartment_rating_and_reviews(models.Model):
    apartment_id=models.ForeignKey(apartments,on_delete=models.PROTECT)
    customer_id=models.ForeignKey(customer,on_delete=models.PROTECT)
    rating=models.DecimalField(max_digits=4,decimal_places=2)
    reviews=models.TextField()
    timestamp=models.DateTimeField(auto_now=True)  


