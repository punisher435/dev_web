import uuid
from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

# Create your models here.

from .managers import rooms_manager,shops_manager,apartments_manager
from django_google_maps import fields as map_fields

User= get_user_model()


def upload_to(instance, filename):
    return 'images/rooms/{filename}'.format(filename=filename)

class rooms(models.Model):
    room_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    seller_id=models.ForeignKey(User,on_delete=models.PROTECT,related_name='room_owner_id')
    price=models.PositiveBigIntegerField()
    owner_discount=models.IntegerField(default=0)
    company_discount=models.IntegerField(default=0)
    fake_discount=models.IntegerField(default=0)
    final_price=models.PositiveBigIntegerField(default=price)
    length=models.IntegerField()
    breadth=models.IntegerField()
    height=models.IntegerField()
    furniture=models.TextField()
    verified=models.BooleanField(default=False)
    capacity=models.IntegerField()
    trust_points=models.BigIntegerField(default=0)
    date_added=models.DateTimeField(auto_now_add=True)
    date_verified=models.DateTimeField(auto_now_add=True)
    photo1=models.ImageField(_("Image"),upload_to=upload_to,default='/images/rooms/default.jpg')
    photo2=models.ImageField(_("Image"),upload_to=upload_to,default='/images/rooms/default.jpg')
    photo3=models.ImageField(_("Image"),upload_to=upload_to,default='/images/rooms/default.jpg')
    photo4=models.ImageField(_("Image"),upload_to=upload_to,default='/images/rooms/default.jpg')
    photo5=models.ImageField(_("Image"),upload_to=upload_to,default='/images/rooms/default.jpg')
    booked=models.BooleanField(default=False)
    removed=models.BooleanField(default=False)
    category=models.CharField(max_length=255)
    facility=models.TextField()
    description = models.TextField()
    location=models.TextField()
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    landmark=models.CharField(max_length=255)
    pincode=models.CharField(max_length=255)
    address = map_fields.AddressField(max_length=200)
    geolocation = map_fields.GeoLocationField(max_length=100)
    avg_rating=models.DecimalField(max_digits=3,decimal_places=1,default=0)
    electricity=models.BooleanField(default=True)
    water_facility=models.BooleanField(default=True)
    house_TV=models.BooleanField(max_length=255)
    power_backup=models.BooleanField(default=False)
    geyser=models.BooleanField(default=False)
    wifi = models.BooleanField(default=False)
    nearby_station1 = models.TextField(max_length=255)
    nearby_station2 = models.TextField(max_length=255)
    nearby_restaurant1 = models.TextField(max_length=255)
    nearby_restaurant2 = models.TextField(max_length=255)
    breakfast=models.BooleanField(default=True)
    lunch=models.BooleanField(default=True)
    dinner=models.BooleanField(default=True)
    room_policy = models.TextField()


    objects = models.Manager()
    personal_rooms = rooms_manager()


class room_rating_and_reviews(models.Model):
    room_id=models.ForeignKey(rooms,on_delete=models.PROTECT,related_name='room')
    customer_id=models.ForeignKey(User,on_delete=models.PROTECT,related_name="room_customer")
    rating=models.DecimalField(max_digits=4,decimal_places=2)
    reviews=models.TextField()
    timestamp=models.DateTimeField(auto_now=True) 



def upload_to_shops(instance, filename):
    return 'images/shops/{filename}'.format(filename=filename)

class shops(models.Model):
    room_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    seller_id=models.ForeignKey(User,on_delete=models.PROTECT,related_name='shop_owner_id')
    price=models.PositiveBigIntegerField()
    owner_discount=models.IntegerField(default=0)
    company_discount=models.IntegerField(default=0)
    fake_discount=models.IntegerField(default=0)
    final_price=models.PositiveBigIntegerField(default=price)
    length=models.IntegerField()
    breadth=models.IntegerField()
    height=models.IntegerField()
    furniture=models.TextField()
    verified=models.BooleanField(default=False)
    trust_points=models.BigIntegerField(default = 0)
    date_added=models.DateTimeField(auto_now_add=True)
    date_verified=models.DateTimeField(auto_now_add=True)
    photo1=models.ImageField(_("Image"),upload_to=upload_to_shops,default='/images/rooms/default.jpg')
    photo2=models.ImageField(_("Image"),upload_to=upload_to_shops,default='/images/rooms/default.jpg')
    photo3=models.ImageField(_("Image"),upload_to=upload_to_shops,default='/images/rooms/default.jpg')
    photo4=models.ImageField(_("Image"),upload_to=upload_to_shops,default='/images/rooms/default.jpg')
    photo5=models.ImageField(_("Image"),upload_to=upload_to_shops,default='/images/rooms/default.jpg')
    booked=models.BooleanField(default=False)
    removed=models.BooleanField(default=False)
    category=models.CharField(max_length=255)
    facilities=models.TextField()
    description = models.TextField()
    location=models.TextField()
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    landmark=models.CharField(max_length=255)
    pincode=models.CharField(max_length=255)
    address = map_fields.AddressField(max_length=200)
    geolocation = map_fields.GeoLocationField(max_length=100)
    avg_rating=models.DecimalField(max_digits=3,decimal_places=1,default=0)
    electricity=models.BooleanField(default=True)
    water_facility=models.BooleanField(default=True)
    wifi = models.BooleanField(default=False)
    power_backup=models.BooleanField(default=False)
    nearby_station1 = models.TextField(max_length=255)
    nearby_station2 = models.TextField(max_length=255)
    shop_policy = models.TextField()

    objects = models.Manager()
    personal_shops = shops_manager()


class shop_rating_and_reviews(models.Model):
    shop_id=models.ForeignKey(rooms,on_delete=models.PROTECT,related_name="shop")
    customer_id=models.ForeignKey(User,on_delete=models.PROTECT,related_name="shop_customer")
    rating=models.DecimalField(max_digits=4,decimal_places=2)
    reviews=models.TextField()
    timestamp=models.DateTimeField(auto_now=True) 



def upload_to_apartments(instance, filename):
    return 'images/apartments/{filename}'.format(filename=filename)

class apartments(models.Model):
    apartment_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    seller_id=models.ForeignKey(User,on_delete=models.PROTECT,related_name='apartment_owner_id')
    price=models.PositiveBigIntegerField()
    owner_discount=models.IntegerField(default=0)
    company_discount=models.IntegerField(default=0)
    fake_discount=models.IntegerField(default=0)
    final_price=models.PositiveBigIntegerField(default=price)
    length=models.IntegerField()
    breadth=models.IntegerField()
    height=models.IntegerField()
    furniture=models.TextField()
    verified=models.BooleanField(default=False)
    BHK=models.IntegerField()
    trust_points=models.BigIntegerField(default=0)
    date_added=models.DateTimeField(auto_now_add=True)
    date_verified=models.DateTimeField(auto_now_add=True)
    photo1=models.ImageField(_("Image"),upload_to=upload_to_apartments,default='/images/rooms/default.jpg')
    photo2=models.ImageField(_("Image"),upload_to=upload_to_apartments,default='/images/rooms/default.jpg')
    photo3=models.ImageField(_("Image"),upload_to=upload_to_apartments,default='/images/rooms/default.jpg')
    photo4=models.ImageField(_("Image"),upload_to=upload_to_apartments,default='/images/rooms/default.jpg')
    photo5=models.ImageField(_("Image"),upload_to=upload_to_apartments,default='/images/rooms/default.jpg')
    booked=models.BooleanField(default=False)
    removed=models.BooleanField(default=False)
    category=models.CharField(max_length=255)
    facilities=models.TextField()
    description = models.TextField()
    location=models.TextField()
    city = models.CharField(max_length=255)
    wifi = models.BooleanField(default=False)
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    landmark=models.CharField(max_length=255)
    pincode=models.CharField(max_length=255)
    address = map_fields.AddressField(max_length=200)
    geolocation = map_fields.GeoLocationField(max_length=100)
    avg_rating=models.DecimalField(max_digits=3,decimal_places=1,default=0)
    electricity=models.BooleanField(default=True)
    water_facility=models.BooleanField(default=True)
    TV=models.CharField(max_length=255)
    power_backup=models.BooleanField(default=False)
    geyser=models.BooleanField(default=False)
    nearby_station1 = models.TextField(max_length=255)
    nearby_station2 = models.TextField(max_length=255)
    nearby_restaurant1 = models.TextField(max_length=255)
    nearby_restaurant2 = models.TextField(max_length=255)
    apartment_policy = models.TextField()

    objects = models.Manager()
    personal_apartments = apartments_manager()



class apartment_rating_and_reviews(models.Model):
    apartment_id=models.ForeignKey(rooms,on_delete=models.PROTECT,related_name="apartment")
    customer_id=models.ForeignKey(User,on_delete=models.PROTECT,related_name="apartment_customer")
    rating=models.DecimalField(max_digits=4,decimal_places=2)
    reviews=models.TextField()
    timestamp=models.DateTimeField(auto_now=True) 

