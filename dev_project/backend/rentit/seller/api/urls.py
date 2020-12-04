from django.urls import path

from .views import seller_list_view,seller_detail_view,seller_details_list_view,seller_details_detail_view

urlpatterns=[
    path('',seller_list_view.as_view()),
    path('details',seller_details_list_view.as_view()),
    path('<pk>',seller_detail_view.as_view()),
    path('details/<pk>',seller_details_detail_view.as_view()),
]