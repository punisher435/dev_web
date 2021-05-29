from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from .forms import AddUserForm,UpdateUserForm
from .models import customUser_profile,seller_bank_details,seller_rating_and_reviews,seller_address

User= get_user_model()

# Register your models here.

class UserAdmin(BaseUserAdmin):
    form = UpdateUserForm
    add_form = AddUserForm

    list_display = ('email', 'first_name', 'last_name','is_seller','gender','profile_completed','bank_completed','address_completed','is_staff','is_superuser')
    list_filter = ('is_staff', 'is_superuser', 'is_seller','is_active','gender','profile_completed','bank_completed','address_completed')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name','is_seller','gender','profile_completed','bank_completed','address_completed')}),
        ('Permissions', {'fields': ('is_active', 'is_staff')}),
    )
    add_fieldsets = (
        (
            None,
            {
                'classes': ('wide',),
                'fields': (
                    'email', 'first_name', 'last_name','is_seller','gender','profile_completed','bank_completed','address_completed','password1',
                    'password2'
                )
            }
        ),
    )
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email', 'first_name', 'last_name')
    filter_horizontal = ()


class profileAdmin(admin.ModelAdmin):
    search_fields=('user_id__email','mobile','aadhar',)

class bankAdmin(admin.ModelAdmin):
    search_fields=('user_id__email','account_no',)
    list_filter=('account_type',)

class addressAdmin(admin.ModelAdmin):
    search_fields=('user_id__email',)


class sellerReviewsAdmin(admin.ModelAdmin):
    search_fields=('seller_id__email','customer_id__email',)
   
    




admin.site.register(User, UserAdmin)
admin.site.register(customUser_profile,profileAdmin)
admin.site.register(seller_bank_details,bankAdmin)
admin.site.register(seller_address,addressAdmin)
admin.site.register(seller_rating_and_reviews,sellerReviewsAdmin)
