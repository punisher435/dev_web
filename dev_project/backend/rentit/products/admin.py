from django.contrib import admin

# Register your models here.

from .models import rooms,minmax_room
from .models import shops,minmax_shop
from .models import apartments,minmax_apartment
from django_google_maps import widgets as map_widgets
from django_google_maps import fields as map_fields

""" class room_admin(admin.ModelAdmin):
    formfield_overrides = {
        map_fields.AddressField: {'widget': map_widgets.GoogleMapsAddressWidget},
    }
 """
class shop_admin(admin.ModelAdmin):
    formfield_overrides = {
        map_fields.AddressField: {'widget': map_widgets.GoogleMapsAddressWidget},
    }
class apartment_admin(admin.ModelAdmin):
    formfield_overrides = {
        map_fields.AddressField: {'widget': map_widgets.GoogleMapsAddressWidget},
    }

admin.site.register(rooms)

admin.site.register(minmax_room)

admin.site.register(shops)

admin.site.register(minmax_shop)

admin.site.register(apartments)

admin.site.register(minmax_apartment)
