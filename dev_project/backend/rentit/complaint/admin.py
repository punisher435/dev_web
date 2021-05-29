from django.contrib import admin
from .models import room_complaints,shop_complaints,apartment_complaints,message_class

# Register your models here.


class complaintRoom(admin.ModelAdmin):
    search_fields=('complaint_id','customer_contact','customer_id__email',)
    list_filter=('customer_fullfilled','seller_fullfilled')

class complaintShop(admin.ModelAdmin):
    search_fields=('complaint_id','customer_contact','customer_id__email',)
    list_filter=('customer_fullfilled','seller_fullfilled')

class complaintApartment(admin.ModelAdmin):
    search_fields=('complaint_id','customer_contact','customer_id__email',)
    list_filter=('customer_fullfilled','seller_fullfilled')

admin.site.register(room_complaints,complaintRoom)

admin.site.register(shop_complaints,complaintShop)

admin.site.register(apartment_complaints,complaintApartment)
admin.site.register(message_class)
