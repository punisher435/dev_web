from django.contrib import admin
from .models import rooms,room_facility,room_rating_and_reviews,shops,shop_facility,shop_rating_and_reviews,apartments,apartment_facility,apartment_rating_and_reviews


# Register your models here.
admin.site.register(rooms)
admin.site.register(room_facility)
admin.site.register(room_rating_and_reviews)
admin.site.register(shops)
admin.site.register(shop_facility)
admin.site.register(shop_rating_and_reviews)
admin.site.register(apartments)
admin.site.register(apartment_facility)
admin.site.register(apartment_rating_and_reviews)