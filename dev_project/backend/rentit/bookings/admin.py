from django.contrib import admin

# Register your models here.

from .models import roomBookings,room_rating_and_reviews,shop_rating_and_reviews,apartment_rating_and_reviews
from .models import shopBookings,apartmentBookings


class roombookAdmin(admin.ModelAdmin):
   
    search_fields = ('booking_id','payment_id','seller_id__email','customer_id__email','room_id__room_id', )
    list_filter = ('refunded','paid','cancelled','extended','seller_paid','paylater','ended','created_at',)


class shopbookAdmin(admin.ModelAdmin):
       
    search_fields = ('booking_id','payment_id','seller_id__email','customer_id__email', 'shop_id__shop_id', )
    list_filter = ('refunded','paid','cancelled','extended','seller_paid','paylater','ended','created_at',)

class apartmentbookAdmin(admin.ModelAdmin):
       
    search_fields = ('booking_id','payment_id', 'seller_id__email','customer_id__email', 'apartment_id__apartment_id',)
    list_filter = ('refunded','paid','cancelled','extended','seller_paid','paylater','ended','created_at',)

class roomRating(admin.ModelAdmin):
    search_fields = ('room_id__room_id','booking_id__booking_id','customer_id__email',)

class shopRating(admin.ModelAdmin):
    search_fields = ('shop_id__shop_id','booking_id__booking_id','customer_id__email',)

class apartmentRating(admin.ModelAdmin):
    search_fields = ('apartment_id__apartment_id','booking_id__booking_id','customer_id__email',)


admin.site.register(roomBookings,roombookAdmin)
admin.site.register(shopBookings,shopbookAdmin)
admin.site.register(apartmentBookings,apartmentbookAdmin)

admin.site.register(room_rating_and_reviews,roomRating)
admin.site.register(apartment_rating_and_reviews,shopRating)
admin.site.register(shop_rating_and_reviews,apartmentRating)


