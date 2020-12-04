from django.contrib import admin
from .models import customer,customer_details

# Register your models here.
admin.site.register(customer)
admin.site.register(customer_details)