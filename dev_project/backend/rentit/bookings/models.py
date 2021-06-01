from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

import uuid

# Create your models here.

user=get_user_model()

from products.models import rooms,shops,apartments
from .managers import rooms_bookings_manager,rooms_seller_bookings_manager
from .managers import shops_bookings_manager,shops_seller_bookings_manager
from .managers import apartments_bookings_manager,apartments_seller_bookings_manager




def upload_to_roomreviews(instance, filename):
    return 'reviews/rooms/{filename}'.format(filename=filename)

def upload_to_shopreviews(instance, filename):
    return 'reviews/shops/{filename}'.format(filename=filename)

def upload_to_apartmentreviews(instance, filename):
    return 'reviews/apartments/{filename}'.format(filename=filename)

class roomBookings(models.Model):

    booking_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)

    room_id = models.ForeignKey(rooms,on_delete=models.PROTECT,related_name="booked_room_id")
    room_name = models.CharField(max_length=255)
    customer_id= models.ForeignKey(user,on_delete=models.PROTECT,related_name="room_customer_id")
    seller_id= models.ForeignKey(user,on_delete=models.PROTECT,related_name="room_seller_id")

    created_at = models.DateTimeField(auto_now_add=True)

    booked_from = models.DateField()
    booked_till = models.DateField()
    capacity = models.IntegerField()
    duration=models.IntegerField()

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    mobile = models.BigIntegerField()
    alternate_mobile=models.BigIntegerField(null=True,blank=True)
    country_code = models.CharField(max_length=255)

    wifi = models.BooleanField()
    house_TV = models.BooleanField()
    room_TV = models.BooleanField()
    house_refridgerator = models.BooleanField()
    room_refridgerator = models.BooleanField()
    purified_water = models.BooleanField()
    geyser = models.BooleanField()
    AC = models.BooleanField()
    cooler = models.BooleanField()
    breakfast = models.BooleanField()
    lunch = models.BooleanField()
    dinner = models.BooleanField()
    
    payment_id = models.CharField(max_length=255,null=True,blank=True)

    currency=models.CharField(max_length=255)
    savings = models.IntegerField()
    cost=models.BigIntegerField()
    price_to_be_paid=models.BigIntegerField()
    discount=models.IntegerField()
    coupon=models.CharField(max_length=255,null=True,blank=True)

    paid = models.BooleanField(default=True)
    seller_pay = models.BigIntegerField()
    seller_paid = models.BooleanField(default=False)

    invoice = models.FileField(upload_to ='invoices/% Y/% m/% d/',null=True,blank=True)  

    cancelled=models.BooleanField(default=False)
    cancelled_date = models.DateTimeField(null=True,blank=True)
    cancellation_reason = models.TextField(null=True,blank=True)
    feedback = models.TextField(null=True,blank=True)

    account_no = models.CharField(max_length=255,null=True, blank=True)
    IFSC_code = models.CharField(max_length=255,null=True, blank=True)
    bank_name = models.CharField(max_length=255,null=True, blank=True)
    bank_address = models.TextField(null=True, blank=True)
    account_type = models.CharField(max_length=255,null=True,blank=True)
    refund_id = models.CharField(max_length=255,null=True,blank=True)


    extended = models.BooleanField(default=False)
    is_extended = models.BooleanField(default=False)
    extended_on = models.ForeignKey('self',null=True,blank=True,on_delete=models.PROTECT)

    room_review = models.BooleanField(default=False)

    refunded=models.BooleanField(default=False)
    refund_amount=models.IntegerField(default=0)
    paylater=models.BooleanField(default=False)
    paylater_date=models.DateField(_("Pay Later Date"),null=True,blank=True)
    
    ended=models.BooleanField(default=False)

    customer = rooms_bookings_manager
    seller = rooms_seller_bookings_manager


class room_rating_and_reviews(models.Model):
    booking_id = models.OneToOneField(roomBookings,on_delete=models.PROTECT,primary_key=True)
    room_id=models.ForeignKey(rooms,on_delete=models.PROTECT,related_name='room_my_id')
    customer_id=models.ForeignKey(user,on_delete=models.PROTECT,related_name="room_customer_my_id")
    rating=models.DecimalField(max_digits=2,decimal_places=1)
    reviews=models.TextField()
    photo1=models.ImageField(upload_to=upload_to_roomreviews,null=True,blank=True)
    photo2=models.ImageField(upload_to=upload_to_roomreviews,null=True,blank=True)
    photo3=models.ImageField(upload_to=upload_to_roomreviews,null=True,blank=True)
    timestamp=models.DateTimeField(auto_now=True) 








class shopBookings(models.Model):

    booking_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)

    shop_id = models.ForeignKey(shops,on_delete=models.PROTECT,related_name="booked_shop_id")
    shop_name = models.CharField(max_length=255)
    customer_id= models.ForeignKey(user,on_delete=models.PROTECT,related_name="shop_customer_id")
    seller_id= models.ForeignKey(user,on_delete=models.PROTECT,related_name="shop_seller_id")

    created_at = models.DateTimeField(auto_now_add=True)

    booked_from = models.DateField()
    booked_till = models.DateField()

    duration=models.IntegerField()

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    mobile = models.BigIntegerField()
    alternate_mobile=models.BigIntegerField(null=True,blank=True)
    country_code = models.CharField(max_length=255)

    wifi = models.BooleanField()
    TV = models.BooleanField()

    purified_water = models.BooleanField()
   
    AC = models.BooleanField()
    cooler = models.BooleanField()

    payment_id = models.CharField(max_length=255)
    
    currency=models.CharField(max_length=255)
    savings = models.IntegerField()
    cost=models.BigIntegerField()
    price_to_be_paid=models.BigIntegerField()
    discount=models.IntegerField()
    coupon=models.CharField(max_length=255,null=True,blank=True)

    paid = models.BooleanField(default=True)
    seller_pay = models.BigIntegerField()
    seller_paid = models.BooleanField(default=False)

    invoice = models.FileField(upload_to ='invoices/% Y/% m/% d/',null=True,blank=True)  

    cancelled=models.BooleanField(default=False)
    cancelled_date = models.DateTimeField(null=True,blank=True)
    cancellation_reason = models.TextField(null=True,blank=True)
    feedback = models.TextField(null=True,blank=True)

    account_no = models.CharField(max_length=255,null=True, blank=True)
    IFSC_code = models.CharField(max_length=255,null=True, blank=True)
    bank_name = models.CharField(max_length=255,null=True, blank=True)
    bank_address = models.TextField(null=True, blank=True)
    account_type = models.CharField(max_length=255,null=True,blank=True)
    refund_id = models.CharField(max_length=255,null=True,blank=True)

    extended = models.BooleanField(default=False)
    is_extended = models.BooleanField(default=False)
    extended_on = models.ForeignKey('self',null=True,blank=True,on_delete=models.PROTECT)

    shop_review = models.BooleanField(default=False)

    refunded=models.BooleanField(default=False)
    refund_amount=models.IntegerField(default=0)
    paylater=models.BooleanField(default=False)
    paylater_date=models.DateField(_("Pay Later Date"),null=True,blank=True)
    
    ended=models.BooleanField(default=False)



class shop_rating_and_reviews(models.Model):
    booking_id = models.OneToOneField(shopBookings,on_delete=models.PROTECT,primary_key=True)
    shop_id=models.ForeignKey(shops,on_delete=models.PROTECT,related_name='shop_my_id')
    customer_id=models.ForeignKey(user,on_delete=models.PROTECT,related_name="shop_customer_my_id")
    rating=models.DecimalField(max_digits=2,decimal_places=1)
    reviews=models.TextField()
    photo1=models.ImageField(upload_to=upload_to_shopreviews,null=True,blank=True)
    photo2=models.ImageField(upload_to=upload_to_shopreviews,null=True,blank=True)
    photo3=models.ImageField(upload_to=upload_to_shopreviews,null=True,blank=True)
    timestamp=models.DateTimeField(auto_now=True) 



class apartmentBookings(models.Model):

    booking_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)

    apartment_id = models.ForeignKey(apartments,on_delete=models.PROTECT,related_name="booked_apartment_id")
    apartment_name = models.CharField(max_length=255)
    customer_id= models.ForeignKey(user,on_delete=models.PROTECT,related_name="apartment_customer_id")
    seller_id= models.ForeignKey(user,on_delete=models.PROTECT,related_name="apartment_seller_id")

    created_at = models.DateTimeField(auto_now_add=True)

    booked_from = models.DateField()
    booked_till = models.DateField()
    
    duration=models.IntegerField()

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    mobile = models.BigIntegerField()
    alternate_mobile=models.BigIntegerField(null=True,blank=True)
    country_code = models.CharField(max_length=255)

    wifi = models.BooleanField()
    TV = models.BooleanField()
    
    house_refridgerator = models.BooleanField()
    
    purified_water = models.BooleanField()
    geyser = models.BooleanField()
    AC = models.BooleanField()
    cooler = models.BooleanField()
    
    laundry = models.BooleanField()

    payment_id = models.CharField(max_length=255)

    currency=models.CharField(max_length=255)
    savings = models.IntegerField()
    cost=models.BigIntegerField()
    price_to_be_paid=models.BigIntegerField()
    discount=models.IntegerField()
    coupon=models.CharField(max_length=255,null=True,blank=True)

    paid = models.BooleanField(default=True)
    seller_pay = models.BigIntegerField()
    seller_paid = models.BooleanField(default=False)

    invoice = models.FileField(upload_to ='invoices/% Y/% m/% d/',null=True,blank=True)  

    cancelled=models.BooleanField(default=False)
    cancelled_date = models.DateTimeField(null=True,blank=True)
    cancellation_reason = models.TextField(null=True,blank=True)
    feedback = models.TextField(null=True,blank=True)

    account_no = models.CharField(max_length=255,null=True, blank=True)
    IFSC_code = models.CharField(max_length=255,null=True, blank=True)
    bank_name = models.CharField(max_length=255,null=True, blank=True)
    bank_address = models.TextField(null=True, blank=True)
    account_type = models.CharField(max_length=255,null=True,blank=True)
    refund_id = models.CharField(max_length=255,null=True,blank=True)

    extended = models.BooleanField(default=False)
    is_extended = models.BooleanField(default=False)
    extended_on = models.ForeignKey('self',null=True,blank=True,on_delete=models.PROTECT)

    apartment_review = models.BooleanField(default=False)

    refunded=models.BooleanField(default=False)
    refund_amount=models.IntegerField(default=0)
    paylater=models.BooleanField(default=False)
    paylater_date=models.DateField(_("Pay Later Date"),null=True,blank=True)
    
    ended=models.BooleanField(default=False)






class apartment_rating_and_reviews(models.Model):
    booking_id = models.OneToOneField(apartmentBookings,on_delete=models.PROTECT,primary_key=True)
    apartment_id=models.ForeignKey(apartments,on_delete=models.PROTECT,related_name='apartment_my_id')
    customer_id=models.ForeignKey(user,on_delete=models.PROTECT,related_name="apartment_customer_my_id")
    rating=models.DecimalField(max_digits=2,decimal_places=1)
    reviews=models.TextField()
    photo1=models.ImageField(upload_to=upload_to_apartmentreviews,null=True,blank=True)
    photo2=models.ImageField(upload_to=upload_to_apartmentreviews,null=True,blank=True)
    photo3=models.ImageField(upload_to=upload_to_apartmentreviews,null=True,blank=True)
    timestamp=models.DateTimeField(auto_now=True) 







""" class shopBookings(models.Model):
    
    booking_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    shop_id = models.ForeignKey(shops,on_delete=models.PROTECT,related_name="booked_shop_id")
    customer_id= models.ForeignKey(user,on_delete=models.PROTECT,related_name="shop_customer_id")
    seller_id= models.ForeignKey(user,on_delete=models.PROTECT,related_name="shop_seller_id")

    created_at = models.DateTimeField(auto_now_add=True)

    booked_from = models.DateField()
    booked_till = models.DateField()

    duration=models.IntegerField()

    currency=models.CharField(max_length=255)
    cost=models.BigIntegerField()
    price_to_be_paid=models.BigIntegerField()
    discount=models.IntegerField()

    paid = models.BooleanField(default=True)

    invoice = models.FileField(upload_to ='invoices/% Y/% m/% d/',null=True) 
    paylater_receipt = models.FileField(upload_to ='paylater_receipts/% Y/% m/% d/',null=True) 

    cancelled=models.BooleanField(default=False)
    refunded=models.BooleanField(default=False)
    paylater=models.BooleanField(default=False)
    paylater_date=models.DateField(_("Pay Later Date"),null=True,blank=True)
    removed=models.BooleanField(default=False)

    customer = shops_bookings_manager
    seller = shops_seller_bookings_manager



class apartmentBookings(models.Model):
    
    booking_id = models.UUIDField( 
         primary_key = True, 
         default = uuid.uuid4, 
         editable = False,
         unique = True)
    apartment_id = models.ForeignKey(apartments,on_delete=models.PROTECT,related_name="booked_apartment_id")
    customer_id= models.ForeignKey(user,on_delete=models.PROTECT,related_name="apartment_customer_id")
    seller_id= models.ForeignKey(user,on_delete=models.PROTECT,related_name="apartment_seller_id")

    created_at = models.DateTimeField(auto_now_add=True)

    booked_from = models.DateField()
    booked_till = models.DateField()

    duration=models.IntegerField()

    currency=models.CharField(max_length=255)
    cost=models.BigIntegerField()
    price_to_be_paid=models.BigIntegerField()
    discount=models.IntegerField()

    paid = models.BooleanField(default=True)

    invoice = models.FileField(upload_to ='invoices/% Y/% m/% d/',null=True) 
    paylater_receipt = models.FileField(upload_to ='paylater_receipts/% Y/% m/% d/',null=True) 

    cancelled=models.BooleanField(default=False)
    refunded=models.BooleanField(default=False)
    paylater=models.BooleanField(default=False)
    paylater_date=models.DateField(_("Pay Later Date"),null=True,blank=True)
    removed=models.BooleanField(default=False)

    customer = apartments_bookings_manager
    seller = apartments_seller_bookings_manager
 """





