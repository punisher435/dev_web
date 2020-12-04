from django.urls import path

from .views import paylater_request_list_view,paylater_request_detail_view,paylater_list_view,paylater_detail_view

urlpatterns=[
    path('paylater_request',paylater_request_list_view.as_view()),
    path('paylater_request/<pk>',paylater_request_detail_view.as_view()),
    path('paylater',paylater_list_view.as_view()),
    path('paylater/<pk>',paylater_detail_view.as_view()),
]