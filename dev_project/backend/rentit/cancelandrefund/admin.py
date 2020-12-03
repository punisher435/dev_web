from django.contrib import admin
from .models import refund_room,refund_shop,refund_apartment

# Register your models here.
admin.site.register(refund_room)
admin.site.register(refund_shop)
admin.site.register(refund_apartment)
