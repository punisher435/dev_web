from django.contrib import admin

# Register your models here.

from .models import rooms,room_rating_and_reviews

admin.site.register(rooms)
admin.site.register(room_rating_and_reviews)
