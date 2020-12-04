from django.contrib import admin
from .models import seller,seller_details,seller_bank_details,seller_rating_and_reviews

# Register your models here.
admin.site.register(seller)
admin.site.register(seller_details)
admin.site.register(seller_bank_details)
admin.site.register(seller_rating_and_reviews)