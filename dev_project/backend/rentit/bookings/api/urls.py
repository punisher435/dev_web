from django.urls import path

from .views import room_bookings_list_view,room_bookings_detail_view,room_bookings_history_list_view,room_bookings_history_detail_view
from .views import shop_bookings_list_view,shop_bookings_detail_view,shop_bookings_history_list_view,shop_bookings_history_detail_view
from .views import apartment_bookings_list_view,apartment_bookings_detail_view,apartment_bookings_history_list_view,apartment_bookings_history_detail_view

urlpatterns=[
    path('room_bookings/current',room_bookings_list_view.as_view()),
    path('room_bookings/current/<pk>',room_bookings_detail_view.as_view()),
    path('room_bookings/history',room_bookings_history_list_view.as_view()),
    path('room_bookings/history/<pk>',room_bookings_history_detail_view.as_view()),
    path('shop_bookings/current',shop_bookings_list_view.as_view()),
    path('shop_bookings/current/<pk>',shop_bookings_detail_view.as_view()),
    path('shop_bookings/history',shop_bookings_history_list_view.as_view()),
    path('shop_bookings/history/<pk>',shop_bookings_history_detail_view.as_view()),
    path('apartment_bookings/current',apartment_bookings_list_view.as_view()),
    path('apartment_bookings/current/<pk>',apartment_bookings_detail_view.as_view()),
    path('apartment_bookings/history',apartment_bookings_history_list_view.as_view()),
    path('apartment_bookings/history/<pk>',apartment_bookings_history_detail_view.as_view()),
]