from django.urls import path

from .views import notifications_admin_list_view,notifications_admin_detail_view,notifications_customer_list_view,notifications_customer_detail_view,notifications_seller_list_view,notifications_seller_detail_view


urlpatterns=[
    path('customer',notifications_customer_list_view.as_view()),
    path('customer/<pk>',notifications_customer_detail_view.as_view()),
    path('admin',notifications_admin_list_view.as_view()),
    path('admin/<pk>',notifications_admin_detail_view.as_view()),
    path('seller',notifications_seller_list_view.as_view()),
    path('seller/<pk>',notifications_seller_detail_view.as_view()),
]