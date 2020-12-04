"""rentit URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/admin/',include('adminuser.api.urls')),
    path('api/customer/',include('customer.api.urls')),
    path('api/seller/',include('seller.api.urls')),
    path('api/bookings/',include('bookings.api.urls')),
    path('api/cancelandrefund/',include('cancelandrefund.api.urls')),
    path('api/cartandwish/',include('cartandwish.api.urls')),
    path('api/notifications/',include('notifications.api.urls')),
    path('api/paylater/',include('paylater.api.urls')),
]
