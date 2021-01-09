from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from .managers import profile_manager





# Create your models here



class UserAccountManager(BaseUserManager):

    def create_user(self,email,first_name,last_name,is_seller,password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address!')
        email =self.normalize_email(email)
        user = self.model(email=email,first_name=first_name,last_name=last_name,is_seller=is_seller,**extra_fields)

        user.set_password(password)
        user.save(using=self._db)
        
        

        return user


    def create_superuser(self,email,first_name,last_name,is_seller,password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        is_seller=False

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')
        return self.create_user(email,first_name,last_name,is_seller, password, **extra_fields)


class customUser(AbstractBaseUser, PermissionsMixin):
    email=models.EmailField(unique=True)
    first_name=models.CharField(max_length=255)
    last_name=models.CharField(max_length=255)
    is_seller=models.BooleanField(default=False)
    profile_completed=models.BooleanField(default=False)
    is_staff=models.BooleanField(default=False)
    is_superuser=models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_jointed=models.DateTimeField(auto_now_add=True)
    removed=models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS= ['first_name','last_name','is_seller']

    def get_full_name(self):
        return self.first_name + ' ' + self.last_name

    def seller(self):
        return self.is_seller

    def get_short_name(self):
        return self.first_name

    def __str__(self):
        return self.email


def upload_to(instance, filename):
    return 'images/profile_pics/{filename}'.format(filename=filename)


class customUser_profile(models.Model):
    user_id=models.OneToOneField(customUser,on_delete=models.PROTECT, primary_key=True)
    country_code=models.CharField(max_length=255,default='+91')
    mobile=models.CharField(max_length=255)
    aadhar=models.CharField(max_length=255)
    alternate_mobile=models.CharField(max_length=255,default='00000000000')
    photo=models.ImageField(_("Image"),upload_to=upload_to,default='/images/profile_pics/default.jpg')

    objects=profile_manager()



class seller_bank_details(models.Model):
    account_type_choices=[
        ('savings','Savings'),
        ('current','Current')
    ]
    user_id=models.OneToOneField(customUser,on_delete=models.CASCADE,primary_key=True)
    account_no = models.CharField(max_length=255)
    bank_name=models.CharField(max_length=255)
    bank_address=models.TextField()
    IFSC_code=models.CharField(max_length=255)
    account_type=models.CharField( max_length=255,choices=account_type_choices)
    total_due_payment=models.BigIntegerField()



class seller_rating_and_reviews(models.Model):
    seller_id=models.ForeignKey(customUser,on_delete=models.PROTECT,related_name='seller_id')
    customer_id=models.ForeignKey(customUser,on_delete=models.PROTECT,related_name='customer_id')
    rating=models.DecimalField(max_digits=4,decimal_places=2)
    reviews=models.TextField()
    timestamp=models.DateTimeField(auto_now=True) 
