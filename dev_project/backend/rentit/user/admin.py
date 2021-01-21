from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from .forms import AddUserForm,UpdateUserForm
from .models import customUser_profile,seller_bank_details,seller_rating_and_reviews

User= get_user_model()

# Register your models here.

class UserAdmin(BaseUserAdmin):
    form = UpdateUserForm
    add_form = AddUserForm

    list_display = ('email', 'first_name', 'last_name','is_seller','profile_completed','is_staff','is_superuser')
    list_filter = ('is_staff', 'is_superuser', 'is_seller','is_active','profile_completed')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name','is_seller','profile_completed')}),
        ('Permissions', {'fields': ('is_active', 'is_staff')}),
    )
    add_fieldsets = (
        (
            None,
            {
                'classes': ('wide',),
                'fields': (
                    'email', 'first_name', 'last_name','is_seller','profile_completed','password1',
                    'password2'
                )
            }
        ),
    )
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email', 'first_name', 'last_name')
    filter_horizontal = ()







admin.site.register(User, UserAdmin)
admin.site.register(customUser_profile)
admin.site.register(seller_bank_details)
admin.site.register(seller_rating_and_reviews)
