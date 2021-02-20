from django.contrib import admin

# Register your models here.

from .models import roomBookings,room_rating_and_reviews,shop_rating_and_reviews,apartment_rating_and_reviews

admin.site.register(roomBookings)
""" admin.site.register(shopBookings)
admin.site.register(apartmentBookings) """

admin.site.register(room_rating_and_reviews)
admin.site.register(apartment_rating_and_reviews)
admin.site.register(shop_rating_and_reviews)