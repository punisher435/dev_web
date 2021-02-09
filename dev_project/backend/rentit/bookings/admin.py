from django.contrib import admin

# Register your models here.

from .models import roomBookings

admin.site.register(roomBookings)
""" admin.site.register(shopBookings)
admin.site.register(apartmentBookings) """