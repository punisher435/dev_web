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

urlpatterns = [
    #authentication
    path('admin/', admin.site.urls),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    
    #user profile
    path('sourcezxradakgdlh/',include('user.api.urls')),
    path('sourceadbahdvjs218/',include('user.api.urls_bank')),
    path('sourcejkzff8wqhdq92/',include('user.api.urls_address')),

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
    path('sourceaklneqns83bdz/',include('products.api.urls_shop_location')),
    path('sourcewadjkj2i1dand/',include('products.api.urls_apartment_location')),
 
    #filter min and max price
    path('sourcekadwbda24/',include('products.api.urls_minmax_room')),
    path('sourcekasdauhnuwiqlr2/',include('products.api.urls_minmax_shop')),
    path('sourcghfhf4/',include('products.api.urls_minmax_apartment')),

    #wishlist
    path('souraawdgrg33w24/',include('wishlist.urls_room_wishlist')),
    path('sourcesnjs03qjkda/',include('wishlist.urls_shop_wishlist')),
    path('sourcenasdknahi29ad/',include('wishlist.urls_apartment_wishlist')),

    #coupons
    path('sourcesfnsjfn231/',include('coupons.urls_coupons')),
    path('sourcesawdajwnr32w2/',include('coupons.urls_apply')),
    path('sourcefsejfnsjcn9302/',include('coupons.urls_coupon_shop')),
    path('sourceasindwanuia29910/',include('coupons.urls_coupon_apartment')),

    #bookings
    path('sourcehjbda983290whjba/',include('bookings.urls')),

    #reviews
    path('sourcebahsda292bidua92/',include('products.api.urls_give_reviews')),

]

urlpatterns += static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)

urlpatterns += [re_path(r'^.*',TemplateView.as_view(template_name= 'index.html'))]