from django.contrib import admin

# Register your models here.

from .models import rooms,room_rating_and_reviews
from .models import shops,shop_rating_and_reviews
from .models import apartments,apartment_rating_and_reviews

admin.site.register(rooms)
admin.site.register(room_rating_and_reviews)

admin.site.register(shops)
admin.site.register(shop_rating_and_reviews)

admin.site.register(apartments)
admin.site.register(apartment_rating_and_reviews)
