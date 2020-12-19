from django.db import models

# Create your models here.

from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


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

