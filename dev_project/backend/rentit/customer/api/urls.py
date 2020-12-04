from django.urls import path

from .views import customer_list_view,customer_detail_view,customer_details_list_view,customer_details_detail_view

urlpatterns=[
    path('',customer_list_view.as_view()),
    path('details',customer_details_list_view.as_view()),
    path('<pk>',customer_detail_view.as_view()),
    path('details/<pk>',customer_details_detail_view.as_view()),
]