from django.contrib import admin
from .models import room_bookings,room_bookings_history,shop_bookings,shop_bookings_history,apartment_bookings,apartment_bookings_history

# Register your models here.
admin.site.register(room_bookings)
admin.site.register(shop_bookings)
admin.site.register(apartment_bookings)
admin.site.register(room_bookings_history)
admin.site.register(shop_bookings_history)
admin.site.register(apartment_bookings_history)