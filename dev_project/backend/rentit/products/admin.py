from django.contrib import admin

# Register your models here.

from .models import rooms,room_rating_and_reviews
from .models import shops,shop_rating_and_reviews
from .models import apartments,apartment_rating_and_reviews
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
admin.site.register(room_rating_and_reviews)

admin.site.register(shops)
admin.site.register(shop_rating_and_reviews)

admin.site.register(apartments)
admin.site.register(apartment_rating_and_reviews)
