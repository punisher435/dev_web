from django.urls import path

from .views import rooms_list_view,rooms_detail_view,room_facility_list_view,room_facility_detail_view,room_rating_and_reviews_list_view,room_rating_and_reviews_detail_view
from .views import shops_list_view,shops_detail_view,shop_facility_list_view,shop_facility_detail_view,shop_rating_and_reviews_list_view,shop_rating_and_reviews_detail_view
from .views import apartments_list_view,apartments_detail_view,apartment_facility_list_view,apartment_facility_detail_view,apartment_rating_and_reviews_list_view,apartment_rating_and_reviews_detail_view



urlpatterns=[
    path('rooms',rooms_list_view.as_view()),
    path('rooms/<pk>',rooms_detail_view.as_view()),
    path('room_facility',room_facility_list_view.as_view()),
    path('room_facility/<pk>',room_facility_detail_view.as_view()),
    path('room_rating_and_reviews',room_rating_and_reviews_list_view.as_view()),
    path('room_rating_and_reviews/<pk>',room_rating_and_reviews_detail_view.as_view()),
    path('shops',shops_list_view.as_view()),
    path('shops/<pk>',shops_detail_view.as_view()),
    path('shop_facility',shop_facility_list_view.as_view()),
    path('shop_facility/<pk>',shop_facility_detail_view.as_view()),
    path('shop_rating_and_reviews',shop_rating_and_reviews_list_view.as_view()),
    path('shop_rating_and_reviews/<pk>',shop_rating_and_reviews_detail_view.as_view()),
    path('apartments',apartments_list_view.as_view()),
    path('apartments/<pk>',apartments_detail_view.as_view()),
    path('apartment_facility',apartment_facility_list_view.as_view()),
    path('apartment_facility/<pk>',apartment_facility_detail_view.as_view()),
    path('apartment_rating_and_reviews',apartment_rating_and_reviews_list_view.as_view()),
    path('apartment_rating_and_reviews/<pk>',apartment_rating_and_reviews_detail_view.as_view()),
]