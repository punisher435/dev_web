from django.contrib import admin

# Register your models here.

from .models import rooms,minmax_room
from .models import shops,minmax_shop
from .models import apartments,minmax_apartment
from django_google_maps import widgets as map_widgets
from django_google_maps import fields as map_fields



class roomAdmin(admin.ModelAdmin):
       
    search_fields = ('room_id','seller_id__email', )
    list_filter = ('verified','booked','removed','pausebooking','category',)

class shopAdmin(admin.ModelAdmin):
       
    search_fields = ('shop_id','seller_id__email', )
    list_filter = ('verified','booked','removed','pausebooking','category',)

class apartmentAdmin(admin.ModelAdmin):
       
    search_fields = ('apartment_id', 'seller_id__email',)
    list_filter = ('verified','booked','removed','pausebooking','category',)

admin.site.register(rooms,roomAdmin)

admin.site.register(minmax_room)

admin.site.register(shops,shopAdmin)

admin.site.register(minmax_shop)

admin.site.register(apartments,apartmentAdmin)

admin.site.register(minmax_apartment)
