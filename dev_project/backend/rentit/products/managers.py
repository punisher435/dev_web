from django.db import models


# rooms manager

class rooms_queryset(models.QuerySet):
    def get_seller_rooms(self,email):
        return self.filter(seller_id=email)

class rooms_manager(models.Manager):
    def get_queryset(self):
        return rooms_queryset(self.model,using=self._db)
    def get_seller_rooms(self,email):
        return self.get_queryset().get_seller_rooms(email)


# shop manager


class shops_queryset(models.QuerySet):
    def get_seller_shops(self,email):
        return self.filter(seller_id=email)

class shops_manager(models.Manager):
    def get_queryset(self):
        return shops_queryset(self.model,using=self._db)
    def get_seller_shops(self,email):
        return self.get_queryset().get_seller_shops(email)


# apartment manager

class apartments_queryset(models.QuerySet):
    def get_seller_apartments(self,email):
        return self.filter(seller_id=email)

class apartments_manager(models.Manager):
    def get_queryset(self):
        return apartments_queryset(self.model,using=self._db)
    def get_seller_apartments(self,email):
        return self.get_queryset().get_seller_apartments(email)
 


