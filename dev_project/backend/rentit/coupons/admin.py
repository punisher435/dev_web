from django.contrib import admin

# Register your models here.

from .models import coupons

class couponAdmin(admin.ModelAdmin):
    search_fields =('coupoun_code','seller_id__email',)
    list_filter=('admin_coupon','coupon_type',)

admin.site.register(coupons,couponAdmin)
