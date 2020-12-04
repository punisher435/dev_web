from django.urls import path

from .views import cart_list_view,cart_detail_view,wishlist_list_view,wishlist_detail_view

urlpatterns=[
    path('cart',cart_list_view.as_view()),
    path('cart/<pk>',cart_detail_view.as_view()),
    path('wishlist',wishlist_list_view.as_view()),
    path('wishlist/<pk>',wishlist_detail_view.as_view()),
]