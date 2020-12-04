from django.urls import path

from .views import admin_user_list_view,admin_user_detail_view

urlpatterns=[
    path('',admin_user_list_view.as_view()),
    path('<pk>',admin_user_detail_view.as_view()),
]