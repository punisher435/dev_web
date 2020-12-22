from django.db import models


class rooms_queryset(models.QuerySet):
    def get_seller_rooms(self,email):
        return self.filter(seller_id=email)

class rooms_manager(models.Manager):
    def get_queryset(self):
        return rooms_queryset(self.model,using=self._db)
    def get_seller_rooms(self,email):
        return self.get_queryset().get_seller_rooms(email)