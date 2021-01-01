from django.contrib import admin

# Register your models here.

from .models import roomBookings, shopBookings, apartmentBookings

admin.site.register(roomBookings)
admin.site.register(shopBookings)
admin.site.register(apartmentBookings)