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
    #info
    room_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    seller_id=models.ForeignKey(User,on_delete=models.PROTECT,related_name='room_owner_id')
    title = models.CharField(max_length=255)
    price=models.PositiveBigIntegerField()
    owner_discount=models.IntegerField(default=0)
    company_discount=models.IntegerField(default=0)
    fake_discount=models.IntegerField(default=0)
    final_price=models.PositiveBigIntegerField(default=price)
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
    booked_by=models.IntegerField(default=0)
    removed=models.BooleanField(default=False)

    #address
    location=models.TextField()
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    landmark=models.CharField(max_length=255)
    pincode=models.CharField(max_length=255)
    currency=models.CharField(max_length=200,default='₹')

    """ address = map_fields.AddressField(max_length=200,blank=True)
    geolocation = map_fields.GeoLocationField(max_length=100,blank=True) """


    #facility and description
    length=models.IntegerField()
    breadth=models.IntegerField()
    height=models.IntegerField()
    furniture=models.TextField()
    category=models.CharField(max_length=255)
    facility=models.TextField()
    description = models.TextField()
    avg_rating=models.DecimalField(max_digits=2,decimal_places=1,default=0)
    reviews=models.DecimalField(max_digits=2,decimal_places=1,default=0)
    cctv_building=models.BooleanField(default=False)
    building_guard=models.BooleanField(default=False)

    balcony=models.BooleanField(default=False)
    separate_washroom=models.BooleanField(default=False)
    windows=models.IntegerField(default=0)
    fans=models.IntegerField(default=1)
    bed_type=models.CharField(max_length=255)
    floor_no=models.IntegerField(default=1)

    electricity=models.BooleanField(default=True)
    cost_electricity = models.IntegerField(default=0)

    water_facility=models.BooleanField(default=True)
    cost_water = models.IntegerField(default=0)
    purified_water = models.BooleanField(default=True)
    cost_purified_water = models.IntegerField(default=0)

    house_TV=models.BooleanField(default=False)
    cost_TV = models.IntegerField(default=0)

    room_TV=models.BooleanField(default=False)

    power_backup=models.BooleanField(default=False)

    geyser=models.BooleanField(default=False)
    cost_geyser = models.IntegerField(default=0)

    wifi = models.BooleanField(default=False)
    cost_wifi = models.IntegerField(default=0)

    AC = models.BooleanField(default=False)
    cost_AC = models.IntegerField(default=0)

    cooler = models.BooleanField(default=False)
    cost_cooler = models.IntegerField(default=0)
    
    laundry = models.BooleanField(default=False)
    cost_laundry = models.IntegerField(default=0)

    iron = models.BooleanField(default=False)
    cost_iron = models.IntegerField(default=0)

    guest_allowed = models.BooleanField(default=False)
    guest_policy=models.CharField(max_length=255,default='null')

    veg_food=models.BooleanField(default=True)
    nonveg_food=models.BooleanField(default=True)
    
    breakfast=models.BooleanField(default=True)
    cost_breakfast = models.IntegerField(default=0)

    lunch=models.BooleanField(default=True)
    cost_lunch = models.IntegerField(default=0)

    dinner=models.BooleanField(default=True)
    cost_dinner = models.IntegerField(default=0)

    #neighbourhood
    nearby_station1 = models.TextField(max_length=255)
    nearby_station2 = models.TextField(max_length=255)
    nearby_restaurant1 = models.TextField(max_length=255)
    nearby_restaurant2 = models.TextField(max_length=255)
    room_policy = models.TextField()

    #
    wishlist=models.BooleanField(default=False)
    cart=models.BooleanField(default=False)


    objects = models.Manager()
    personal_rooms = rooms_manager()


class room_rating_and_reviews(models.Model):
    room_id=models.ForeignKey(rooms,on_delete=models.PROTECT,related_name='room')
    customer_id=models.ForeignKey(User,on_delete=models.PROTECT,related_name="room_customer")
    rating=models.DecimalField(max_digits=2,decimal_places=1)
    reviews=models.TextField()
    timestamp=models.DateTimeField(auto_now=True) 



def upload_to_shops(instance, filename):
    return 'images/shops/{filename}'.format(filename=filename)

class shops(models.Model):
    #info
    room_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    seller_id=models.ForeignKey(User,on_delete=models.PROTECT,related_name='shop_owner_id')
    title = models.CharField(max_length=255)
    price=models.PositiveBigIntegerField()
    owner_discount=models.IntegerField(default=0)
    company_discount=models.IntegerField(default=0)
    fake_discount=models.IntegerField(default=0)
    final_price=models.PositiveBigIntegerField(default=price)
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
    currency=models.CharField(max_length=200,default='₹')

    #address
    location=models.TextField()
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    landmark=models.CharField(max_length=255)
    pincode=models.CharField(max_length=255)

    address = map_fields.AddressField(max_length=200)
    geolocation = map_fields.GeoLocationField(max_length=100)

    #facilities and description
    length=models.IntegerField()
    breadth=models.IntegerField()
    height=models.IntegerField()
    furniture=models.TextField()
    category=models.CharField(max_length=255)
    facilities=models.TextField()
    description = models.TextField()
    avg_rating=models.DecimalField(max_digits=2,decimal_places=1,default=0)
    reviews=models.DecimalField(max_digits=2,decimal_places=1,default=0)
    cctv_building=models.BooleanField(default=False)
    building_guard=models.BooleanField(default=False)

    washroom=models.IntegerField(default=1)
    total_rooms=models.IntegerField(default=1)
    windows=models.IntegerField(default=1)
    total_floors=models.IntegerField(default=1)
    floor_no=models.IntegerField(default=1)

    electricity=models.BooleanField(default=True)
    cost_electricity = models.IntegerField(default=0)

    water_facility=models.BooleanField(default=True)
    cost_water = models.IntegerField(default=0)
    purified_water = models.BooleanField(default=True)
    cost_purified_water = models.IntegerField(default=0)

    wifi = models.BooleanField(default=False)
    cost_wifi = models.IntegerField(default=0)

    power_backup=models.BooleanField(default=False)
    
    #neighbourhood
    nearby_station1 = models.TextField(max_length=255)
    nearby_station2 = models.TextField(max_length=255)
    shop_policy = models.TextField()

    # 
    wishlist=models.BooleanField(default=False)
    cart=models.BooleanField(default=False)


    objects = models.Manager()
    personal_shops = shops_manager()


class shop_rating_and_reviews(models.Model):
    shop_id=models.ForeignKey(rooms,on_delete=models.PROTECT,related_name="shop")
    customer_id=models.ForeignKey(User,on_delete=models.PROTECT,related_name="shop_customer")
    rating=models.DecimalField(max_digits=2,decimal_places=1)
    reviews=models.TextField()
    timestamp=models.DateTimeField(auto_now=True) 



def upload_to_apartments(instance, filename):
    return 'images/apartments/{filename}'.format(filename=filename)

class apartments(models.Model):
    #info
    apartment_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    seller_id=models.ForeignKey(User,on_delete=models.PROTECT,related_name='apartment_owner_id')
    title = models.CharField(max_length=255)
    price=models.PositiveBigIntegerField()
    owner_discount=models.IntegerField(default=0)
    company_discount=models.IntegerField(default=0)
    fake_discount=models.IntegerField(default=0)
    final_price=models.PositiveBigIntegerField(default=price)
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
    photo6=models.ImageField(_("Image"),upload_to=upload_to_apartments,default='/images/rooms/default.jpg')
    booked=models.BooleanField(default=False)
    removed=models.BooleanField(default=False)
    category=models.CharField(max_length=255)
    currency=models.CharField(max_length=200,default='₹')

    #address
    location=models.TextField()
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    landmark=models.CharField(max_length=255)
    pincode=models.CharField(max_length=255)

    address = map_fields.AddressField(max_length=200)
    geolocation = map_fields.GeoLocationField(max_length=100)

    #facilities and description
    length=models.IntegerField()
    breadth=models.IntegerField()
    height=models.IntegerField()
    furniture=models.TextField()
    facilities=models.TextField()
    description = models.TextField()
    avg_rating=models.DecimalField(max_digits=2,decimal_places=1,default=0)
    reviews=models.DecimalField(max_digits=2,decimal_places=1,default=0)
    cctv_building=models.BooleanField(default=False)
    building_guard=models.BooleanField(default=False)

    wifi = models.BooleanField(default=False)
    cost_wifi = models.IntegerField(default=0)

    balcony=models.IntegerField(default=0)
    washroom=models.IntegerField(default=1)
    total_rooms=models.IntegerField(default=1)
    windows=models.IntegerField(default=1)
    bed_type=models.CharField(max_length=255)
    #floor no. for flats and total floors for bunglows
    total_floors=models.IntegerField(default=1)
    floor_no=models.IntegerField(default=1)
    apartment_type=models.CharField(max_length=255)

    AC = models.BooleanField(default=False)
    cost_AC = models.IntegerField(default=0)

    cooler = models.BooleanField(default=False)
    cost_cooler = models.IntegerField(default=0)

    electricity=models.BooleanField(default=True)
    cost_electricity = models.IntegerField(default=0)

    water_facility=models.BooleanField(default=True)
    cost_water = models.IntegerField(default=0)
    purified_water = models.BooleanField(default=True)
    cost_purified_water = models.IntegerField(default=0)

    TV=models.CharField(max_length=255)
    cost_TV = models.IntegerField(default=0)

    power_backup=models.BooleanField(default=False)

    geyser=models.BooleanField(default=False)
    cost_geyser = models.IntegerField(default=0)

    #neighbourhood
    nearby_station1 = models.TextField(max_length=255)
    nearby_station2 = models.TextField(max_length=255)
    nearby_restaurant1 = models.TextField(max_length=255)
    nearby_restaurant2 = models.TextField(max_length=255)
    apartment_policy = models.TextField()

    #
    wishlist=models.BooleanField(default=False)
    cart=models.BooleanField(default=False)

    objects = models.Manager()
    personal_apartments = apartments_manager()



class apartment_rating_and_reviews(models.Model):
    apartment_id=models.ForeignKey(rooms,on_delete=models.PROTECT,related_name="apartment")
    customer_id=models.ForeignKey(User,on_delete=models.PROTECT,related_name="apartment_customer")
    rating=models.DecimalField(max_digits=2,decimal_places=1)
    reviews=models.TextField()
    timestamp=models.DateTimeField(auto_now=True) 

