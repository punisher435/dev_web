from django.urls import path

from .views import refund_room_list_view,refund_room_detail_view,refund_shop_list_view,refund_shop_detail_view,refund_apartment_list_view,refund_apartment_detail_view

urlpatterns=[
    path('room',refund_room_list_view.as_view()),
    path('room/<pk>',refund_room_detail_view.as_view()),
    path('shop',refund_shop_list_view.as_view()),
    path('shop/<pk>',refund_shop_detail_view.as_view()),
    path('apartment',refund_apartment_list_view.as_view()),
    path('apartment/<pk>',refund_apartment_detail_view.as_view()),
]