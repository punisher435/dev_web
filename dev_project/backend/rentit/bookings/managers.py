from django.db import models

#room bookings customer

class rooms_bookings_queryset(models.QuerySet):
    def get_my_bookings(self,email):
        return self.filter(customer_id=email)

class rooms_bookings_manager(models.Manager):
    def get_queryset(self):
        return rooms_bookings_queryset(self.model,using=self._db)
    def get_my_bookings(self,email):
        return self.get_queryset().get_my_bookings(email)


#room bookings seller

class rooms_seller_bookings_queryset(models.QuerySet):
    def get_seller_bookings(self,email):
        return self.filter(seller_id=email)

class rooms_seller_bookings_manager(models.Manager):
    def get_queryset(self):
        return rooms_seller_bookings_queryset(self.model,using=self._db)
    def get_seller_bookings(self,email):
        return self.get_queryset().get_seller_bookings(email)


#shop bookings customer

class shops_bookings_queryset(models.QuerySet):
    def get_my_bookings(self,email):
        return self.filter(customer_id=email)

class shops_bookings_manager(models.Manager):
    def get_queryset(self):
        return shops_bookings_queryset(self.model,using=self._db)
    def get_my_bookings(self,email):
        return self.get_queryset().get_my_bookings(email)



#shop bookings seller

class shops_seller_bookings_queryset(models.QuerySet):
    def get_seller_bookings(self,email):
        return self.filter(seller_id=email)

class shops_seller_bookings_manager(models.Manager):
    def get_queryset(self):
        return shops_seller_bookings_queryset(self.model,using=self._db)
    def get_seller_bookings(self,email):
        return self.get_queryset().get_seller_bookings(email)




#apartment bookings customer

class apartments_bookings_queryset(models.QuerySet):
    def get_my_bookings(self,email):
        return self.filter(customer_id=email)

class apartments_bookings_manager(models.Manager):
    def get_queryset(self):
        return apartments_bookings_queryset(self.model,using=self._db)
    def get_my_bookings(self,email):
        return self.get_queryset().get_my_bookings(email)



#apartment bookings seller

class apartments_seller_bookings_queryset(models.QuerySet):
    def get_seller_bookings(self,email):
        return self.filter(seller_id=email)

class apartments_seller_bookings_manager(models.Manager):
    def get_queryset(self):
        return apartments_seller_bookings_queryset(self.model,using=self._db)
    def get_seller_bookings(self,email):
        return self.get_queryset().get_seller_bookings(email)