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
from django.urls import path,include,re_path
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve

urlpatterns = [
    #authentication
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    
    #user profile
    path('sourcezxradakgdlh/',include('user.api.urls')),

    #rooms
    path('sourcedjfnsk743/',include('products.api.urls_room_reviews')),
    path('sourceaxcnfrudadv34/',include('products.api.urls_rooms_listing')),
    path('sourcewdsfdaegds/',include('products.api.urls_rooms_personal')),

    #shops
    path('sourceadadk2647kfs/',include('products.api.urls_shops_listing')),
    path('sourcekfhkt274fs/',include('products.api.urls_shops_personal')),
    path('sourcensjahdwua2853/',include('products.api.urls_shop_reviews')),

    #apartments
    path('sourcebvdfesl2746/',include('products.api.urls_apartments_listing')),
    path('sourceddnvslf54d/',include('products.api.urls_apartments_personal')),
    path('sourcemvdsnksnd59472/',include('products.api.urls_apartment_reviews')),

    #location
    path('sourceadbeios287y19/',include('products.api.urls_location_room')),
 
    #filter min and max price
    path('sourcekadwbda24/',include('products.api.urls_minmax_room')),
    path('sourcekasdauhnuwiqlr2/',include('products.api.urls_minmax_shop')),
    path('sourcghfhf4/',include('products.api.urls_minmax_apartment')),

    #wishlist
    path('souraawdgrg33w24/',include('wishlist.urls_room_wishlist')),
    path('sourcesnjs03qjkda/',include('wishlist.urls_shop_wishlist')),
    path('sourcenasdknahi29ad/',include('wishlist.urls_apartment_wishlist')),

    #cart
    path('souradadnaknda/',include('cart.urls_cart_room')),
    path('sourcekfnenasd/',include('cart.urls_cart_shop')),
    path('sourceajd28eajbdk/',include('cart.urls_cart_apartment')),

]

urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*',TemplateView.as_view(template_name= 'index.html'))]