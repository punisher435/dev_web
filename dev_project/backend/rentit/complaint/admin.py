from django.contrib import admin
from .models import room_complaints,shop_complaints,apartment_complaints,message_class

# Register your models here.

admin.site.register(room_complaints)

admin.site.register(shop_complaints)

admin.site.register(apartment_complaints)
admin.site.register(message_class)
