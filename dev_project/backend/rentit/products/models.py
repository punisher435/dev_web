import uuid
from django.db import models
from django.contrib.auth import get_user_model
from datetime import date
import datetime
from django.utils.translation import gettext_lazy as _
# Create your models here.

from .managers import rooms_manager,shops_manager,apartments_manager
from django_google_maps import fields as map_fields


User= get_user_model()


def upload_to(instance, filename):
    return 'images/rooms/{filename}'.format(filename=filename)

def upload_to_roomreviews(instance, filename):
    return 'reviews/rooms/{filename}'.format(filename=filename)

def upload_to_shopreviews(instance, filename):
    return 'reviews/shops/{filename}'.format(filename=filename)

def upload_to_apartmentreviews(instance, filename):
    return 'reviews/apartments/{filename}'.format(filename=filename)


def upload_file_to(instance, filename):
    return 'address_proof/rooms/{filename}'.format(filename=filename)

def upload_file_to1(instance, filename):
    return 'address_proof/shops/{filename}'.format(filename=filename)

def upload_file_to2(instance, filename):
    return 'address_proof/apartments/{filename}'.format(filename=filename)

yesterday = datetime.datetime.now() - datetime.timedelta(days = 1)

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
    seller_price = models.IntegerField()
    owner_discount=models.IntegerField(default=0)
    company_discount=models.IntegerField(default=0)
    fake_discount=models.IntegerField(default=0)
    final_price=models.PositiveBigIntegerField(default=price)
    verified=models.BooleanField(default=False)
    capacity=models.IntegerField()
    trust_points=models.BigIntegerField(default=0)
    date_added=models.DateTimeField(auto_now_add=True)
    date_verified=models.DateTimeField(null=True, blank=True)
    net_discount=models.IntegerField(default=0)
    photo1=models.ImageField(_("Image"),upload_to=upload_to,default='/images/rooms/default.jpg')
    photo2=models.ImageField(_("Image"),upload_to=upload_to,default='/images/rooms/default.jpg')
    photo3=models.ImageField(_("Image"),upload_to=upload_to,default='/images/rooms/default.jpg')
    photo4=models.ImageField(_("Image"),upload_to=upload_to,default='/images/rooms/default.jpg')
    photo5=models.ImageField(_("Image"),upload_to=upload_to,default='/images/rooms/default.jpg')
    
    booked=models.BooleanField(default=False)
    booked_by=models.IntegerField(default=0)
    bookedtill =models.DateField(_("Booked_till_Date"),default=datetime.date(2000,1,1))
    removed=models.BooleanField(default=False)
    commission = models.IntegerField(default=0)
    pausebooking = models.BooleanField(default=False)

    book1 = models.DateField(null = True,blank=True)
    book2 = models.DateField(null = True,blank=True)
    book3 = models.DateField(null = True,blank=True)
    book4 = models.DateField(null = True,blank=True)
    book5 = models.DateField(null = True,blank=True)
    book6 = models.DateField(null = True,blank=True)
    book7 = models.DateField(null = True,blank=True)
    book8 = models.DateField(null = True,blank=True)
    book9 = models.DateField(null = True,blank=True)
    book10 = models.DateField(null = True,blank=True)

    #address
    location=models.TextField()
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    landmark=models.CharField(max_length=255)
    pincode=models.CharField(max_length=255)
    currency=models.CharField(max_length=200,default='₹ INR')

    """ address = map_fields.AddressField(max_length=200,blank=True)
    geolocation = map_fields.GeoLocationField(max_length=100,blank=True) """

    longitude = models.DecimalField(max_digits=9,decimal_places=6,default=0.0)
    latitude = models.DecimalField(max_digits=9,decimal_places=6,default=0.0)

    gender = models.CharField(max_length=255)


    #facility and description
    length=models.IntegerField()
    breadth=models.IntegerField()
    height=models.IntegerField()
    furniture=models.TextField()
    category=models.CharField(max_length=255)
    facility=models.TextField()
    description = models.TextField()
    avg_rating=models.DecimalField(max_digits=9,decimal_places=1,default=0)
    reviews=models.DecimalField(max_digits=9,decimal_places=1,default=0)
    cctv_building=models.BooleanField(default=False)
    building_guard=models.BooleanField(default=False)

    balcony=models.IntegerField(default=0)
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
    removable_purified_water=models.BooleanField(default=False)
    cost_purified_water = models.IntegerField(default=0)

    house_TV=models.BooleanField(default=False)
    removable_house_TV=models.BooleanField(default=False)
    cost_TV = models.IntegerField(default=0)

    room_TV=models.BooleanField(default=False)
    cost_roomTV = models.IntegerField(default=0)
    removable_room_TV=models.BooleanField(default=False)

    house_refridgerator=models.BooleanField(default=False)
    removable_house_refridgerator=models.BooleanField(default=False)
    cost_refridgerator = models.IntegerField(default=0)

    room_refridgerator=models.BooleanField(default=False)
    cost_roomrefridgerator = models.IntegerField(default=0)
    removable_room_refridgerator=models.BooleanField(default=False)

    power_backup=models.BooleanField(default=False)

    geyser=models.BooleanField(default=False)
    removable_geyser=models.BooleanField(default=False)
    cost_geyser = models.IntegerField(default=0)

    wifi = models.BooleanField(default=False)
    removable_wifi=models.BooleanField(default=False)
    cost_wifi = models.IntegerField(default=0)

    AC = models.BooleanField(default=False)
    removable_AC=models.BooleanField(default=False)
    cost_AC = models.IntegerField(default=0)

    cooler = models.BooleanField(default=False)
    removable_cooler=models.BooleanField(default=False)
    cost_cooler = models.IntegerField(default=0)
    
    laundry = models.BooleanField(default=False)
    cost_laundry = models.IntegerField(default=0)

    iron = models.BooleanField(default=False)
    cost_iron = models.IntegerField(default=0)

    guest_allowed = models.BooleanField(default=False)
    guest_policy=models.TextField()

    veg_food=models.BooleanField(default=True)
    nonveg_food=models.BooleanField(default=True)
    food_policy=models.TextField()
    
    breakfast=models.BooleanField(default=True)
    removable_breakfast=models.BooleanField(default=False)
    cost_breakfast = models.IntegerField(default=0)

    lunch=models.BooleanField(default=True)
    removable_lunch=models.BooleanField(default=False)
    cost_lunch = models.IntegerField(default=0)

    dinner=models.BooleanField(default=True)
    removable_dinner=models.BooleanField(default=False)
    cost_dinner = models.IntegerField(default=0)

    room_cleaning=models.BooleanField(default=False)
    cost_cleaning = models.IntegerField(default=0)

    #neighbourhood
    nearby_station1 = models.TextField(max_length=255)
    distance1 = models.DecimalField(max_digits=3,decimal_places=1,default=0)
    nearby_station2 = models.TextField(max_length=255)
    distance2 = models.DecimalField(max_digits=3,decimal_places=1,default=0)
    room_policy = models.TextField(null=True,blank=True)

    #
    wishlist=models.IntegerField(default=0)
    cart=models.IntegerField(default=0)

    address_proof = models.FileField(upload_to=upload_file_to,blank=True,null=True) 

    objects = models.Manager()
    personal_rooms = rooms_manager()




class minmax_room(models.Model):
    max_price = models.IntegerField()
    min_price = models.IntegerField()




def upload_to_shops(instance, filename):
    return 'images/shops/{filename}'.format(filename=filename)

class shops(models.Model):
    #info
    shop_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    seller_id=models.ForeignKey(User,on_delete=models.PROTECT,related_name='shop_owner_id')
    seller_price = models.IntegerField()
    title = models.CharField(max_length=255)
    price=models.PositiveBigIntegerField()
    owner_discount=models.IntegerField(default=0)
    company_discount=models.IntegerField(default=0)
    fake_discount=models.IntegerField(default=0)
    final_price=models.PositiveBigIntegerField(default=price)
    net_discount=models.IntegerField(default=0)
    verified=models.BooleanField(default=False)
    trust_points=models.BigIntegerField(default = 0)
    date_added=models.DateTimeField(auto_now_add=True)
    date_verified=models.DateTimeField(null=True, blank=True)
    photo1=models.ImageField(_("Image"),upload_to=upload_to_shops,default='/images/rooms/default.jpg')
    photo2=models.ImageField(_("Image"),upload_to=upload_to_shops,default='/images/rooms/default.jpg')
    photo3=models.ImageField(_("Image"),upload_to=upload_to_shops,default='/images/rooms/default.jpg')
    photo4=models.ImageField(_("Image"),upload_to=upload_to_shops,default='/images/rooms/default.jpg')
    photo5=models.ImageField(_("Image"),upload_to=upload_to_shops,default='/images/rooms/default.jpg')

    currency=models.CharField(max_length=200,default='₹ INR')

    booked=models.BooleanField(default=False)
    bookedtill =models.DateField(_("Booked_till_Date"),default=datetime.date(2000,1,1))
    removed=models.BooleanField(default=False)
    commission = models.IntegerField(default=0)
    pausebooking = models.BooleanField(default=False)

    gender = models.CharField(max_length=255)

    #address
    location=models.TextField()
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    landmark=models.CharField(max_length=255)
    pincode=models.CharField(max_length=255)

    longitude = models.DecimalField(max_digits=9,decimal_places=6,default=0.0)
    latitude = models.DecimalField(max_digits=9,decimal_places=6,default=0.0)


    #facilities and description
    length=models.IntegerField()
    breadth=models.IntegerField()
    height=models.IntegerField()
    furniture=models.TextField()
    category=models.CharField(max_length=255,null=True, blank=True)
    facility=models.TextField()
    description = models.TextField()
    avg_rating=models.DecimalField(max_digits=9,decimal_places=1,default=0)
    reviews=models.DecimalField(max_digits=9,decimal_places=1,default=0)

    cctv_building=models.BooleanField(default=False)
    building_guard=models.BooleanField(default=False)

    washroom=models.IntegerField(default=1)
    separate_washroom=models.BooleanField(default=False)
    total_rooms=models.IntegerField(default=1)
    fans = models.IntegerField(default=0)
    windows=models.IntegerField(default=1)
    total_floors=models.IntegerField(default=1)
    floor_no=models.IntegerField(default=1)
    balcony= models.IntegerField(default=0)

    electricity=models.BooleanField(default=True)
    cost_electricity = models.IntegerField(default=0)

    water_facility=models.BooleanField(default=True)
    cost_water = models.IntegerField(default=0)

    purified_water = models.BooleanField(default=True)
    removable_purified_water=models.BooleanField(default=False)
    cost_purified_water = models.IntegerField(default=0)

    wifi = models.BooleanField(default=False)
    removable_wifi=models.BooleanField(default=False)
    cost_wifi = models.IntegerField(default=0)

    cooler = models.BooleanField(default=False)
    removable_cooler=models.BooleanField(default=False)
    cost_cooler = models.IntegerField(default=0)

    power_backup=models.BooleanField(default=False)

    AC = models.BooleanField(default=False)
    removable_AC=models.BooleanField(default=False)
    cost_AC = models.IntegerField(default=0)

    TV = models.BooleanField(default=False)
    cost_TV = models.IntegerField(default=0)
    removable_TV = models.BooleanField(default=False)

    shop_cleaning=models.BooleanField(default=False)
    cost_cleaning = models.IntegerField(default=0)
    
    #neighbourhood
    nearby_station1 = models.TextField(max_length=255)
    distance1 = models.DecimalField(max_digits=3,decimal_places=1,default=0)
    nearby_station2 = models.TextField(max_length=255)
    distance2 = models.DecimalField(max_digits=3,decimal_places=1,default=0)
    shop_policy = models.TextField(null=True,blank=True)
    address_proof = models.FileField(upload_to=upload_file_to1,blank=True,null=True) 

    # 
    wishlist=models.IntegerField(default=0)
    cart=models.IntegerField(default=0)

    


    objects = models.Manager()
    personal_shops = shops_manager()


class shop_rating_and_reviews(models.Model):
    shop_id=models.ForeignKey(rooms,on_delete=models.PROTECT,related_name="shop")
    customer_id=models.ForeignKey(User,on_delete=models.PROTECT,related_name="shop_customer")
    rating=models.DecimalField(max_digits=2,decimal_places=1)
    reviews=models.TextField()
    timestamp=models.DateTimeField(auto_now=True)
    photo1=models.ImageField(upload_to=upload_to_roomreviews,default='/images/rooms/default.jpg')
    photo2=models.ImageField(upload_to=upload_to_roomreviews,default='/images/rooms/default.jpg')
    photo3=models.ImageField(upload_to=upload_to_roomreviews,default='/images/rooms/default.jpg') 

class minmax_shop(models.Model):
    max_price = models.IntegerField()
    min_price = models.IntegerField()



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
    seller_price = models.IntegerField()
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
    date_verified=models.DateTimeField(null=True, blank=True)
    net_discount=models.IntegerField(default=0)
    photo1=models.ImageField(_("Image"),upload_to=upload_to_apartments,default='/images/rooms/default.jpg')
    photo2=models.ImageField(_("Image"),upload_to=upload_to_apartments,default='/images/rooms/default.jpg')
    photo3=models.ImageField(_("Image"),upload_to=upload_to_apartments,default='/images/rooms/default.jpg')
    photo4=models.ImageField(_("Image"),upload_to=upload_to_apartments,default='/images/rooms/default.jpg')
    photo5=models.ImageField(_("Image"),upload_to=upload_to_apartments,default='/images/rooms/default.jpg')
    photo6=models.ImageField(_("Image"),upload_to=upload_to_apartments,default='/images/rooms/default.jpg')

    currency=models.CharField(max_length=200,default='₹ INR')

    gender = models.CharField(max_length=255)

    booked=models.BooleanField(default=False)
    bookedtill =models.DateField(_("Booked_till_Date"),default=datetime.date(2000,1,1))
    removed=models.BooleanField(default=False)
    commission = models.IntegerField(default=0)
    pausebooking = models.BooleanField(default=False)

    #address
    location=models.TextField()
    city = models.CharField(max_length=255)
    state = models.CharField(max_length=255)
    country = models.CharField(max_length=255)
    landmark=models.CharField(max_length=255)
    pincode=models.CharField(max_length=255)

    
    longitude = models.DecimalField(max_digits=9,decimal_places=6,default=0.0)
    latitude = models.DecimalField(max_digits=9,decimal_places=6,default=0.0)


    #facilities and description
    length=models.IntegerField()
    breadth=models.IntegerField()
    height=models.IntegerField()
    furniture=models.TextField()
    facility=models.TextField()
    description = models.TextField()
    fans = models.IntegerField(default=0)
    avg_rating=models.DecimalField(max_digits=9,decimal_places=1,default=0)
    reviews=models.DecimalField(max_digits=9,decimal_places=1,default=0)
    cctv_building=models.BooleanField(default=False)
    building_guard=models.BooleanField(default=False)

    wifi = models.BooleanField(default=False)
    removable_wifi=models.BooleanField(default=False)
    cost_wifi = models.IntegerField(default=0)

    balcony=models.IntegerField(default=0)
    washroom=models.IntegerField(default=1)
    total_rooms=models.IntegerField(default=1)
    windows=models.IntegerField(default=1)
    bed_type=models.CharField(max_length=255)
    #floor no. for flats and total floors for bunglows
    total_floors=models.IntegerField(default=1)

    floor_no=models.IntegerField(default=1)
    sofa = models.BooleanField(default=False)
    total_beds=models.IntegerField(default=1)

    apartment_type=models.CharField(max_length=255)
    category=models.CharField(max_length=255,null=True, blank=True)

    AC = models.BooleanField(default=False)
    total_AC = models.IntegerField(default=0)
    removable_AC=models.BooleanField(default=False)
    cost_AC = models.IntegerField(default=0)

    house_refridgerator=models.BooleanField(default=False)
    removable_house_refridgerator=models.BooleanField(default=False)
    cost_refridgerator = models.IntegerField(default=0)

    cooler = models.BooleanField(default=False)
    total_cooler = models.IntegerField(default=0)
    removable_cooler=models.BooleanField(default=False)
    cost_cooler = models.IntegerField(default=0)

    electricity=models.BooleanField(default=True)
    cost_electricity = models.IntegerField(default=0)

    water_facility=models.BooleanField(default=True)
    cost_water = models.IntegerField(default=0)

    purified_water = models.BooleanField(default=True)
    removable_purified_water=models.BooleanField(default=False)
    cost_purified_water = models.IntegerField(default=0)

    TV=models.BooleanField(default=False)
    removable_house_TV=models.BooleanField(default=False)
    cost_TV = models.IntegerField(default=0)
    total_TV = models.IntegerField(default=0) 

    power_backup=models.BooleanField(default=False)

    geyser=models.BooleanField(default=False)
    total_geyser=models.IntegerField(default=0)
    removable_geyser=models.BooleanField(default=False)
    cost_geyser = models.IntegerField(default=0)

    laundry=models.BooleanField(default=False)
    cost_laundry = models.IntegerField(default=0)
    removable_laundry=models.BooleanField(default=False)

    apartment_cleaning=models.BooleanField(default=False)
    cost_cleaning = models.IntegerField(default=0)

    #neighbourhood
    nearby_station1 = models.TextField(max_length=255)
    distance1 = models.DecimalField(max_digits=3,decimal_places=1,default=0)
    nearby_station2 = models.TextField(max_length=255)
    distance2 = models.DecimalField(max_digits=3,decimal_places=1,default=0)
    apartment_policy = models.TextField(null=True,blank=True)
    address_proof = models.FileField(upload_to=upload_file_to2,blank=True,null=True) 

    #
    wishlist=models.IntegerField(default=0)
    cart=models.IntegerField(default=0)

    objects = models.Manager()
    personal_apartments = apartments_manager()



class apartment_rating_and_reviews(models.Model):
    apartment_id=models.ForeignKey(rooms,on_delete=models.PROTECT,related_name="apartment")
    customer_id=models.ForeignKey(User,on_delete=models.PROTECT,related_name="apartment_customer")
    rating=models.DecimalField(max_digits=2,decimal_places=1)
    reviews=models.TextField()
    timestamp=models.DateTimeField(auto_now=True)
    photo1=models.ImageField(upload_to=upload_to_roomreviews,default='/images/rooms/default.jpg')
    photo2=models.ImageField(upload_to=upload_to_roomreviews,default='/images/rooms/default.jpg')
    photo3=models.ImageField(upload_to=upload_to_roomreviews,default='/images/rooms/default.jpg') 

class minmax_apartment(models.Model):
    max_price = models.IntegerField()
    min_price = models.IntegerField()

