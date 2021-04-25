from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework import filters
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework import permissions
from rest_framework_simplejwt import authentication
from rest_framework import mixins

from user.models import seller_rating_and_reviews
from .serializers import Seller_rating_and_reviews_serializer



class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10


class StandardResultsSetPagination1(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 3



class seller_reviews(viewsets.ReadOnlyModelViewSet):

    pagination_class = StandardResultsSetPagination
    filter_backends=(filters.OrderingFilter,)
    ordering_fields = ['timestamp','rating']
    ordering = ['-rating']
    serializer_class = Seller_rating_and_reviews_serializer

    def get_queryset(self):
        seller = self.request.query_params.get('seller_id')
        query_set = seller_rating_and_reviews.objects.all()
        query_set = query_set.filter(seller_id=seller)
        return query_set


class seller_reviews_short(viewsets.ReadOnlyModelViewSet):
    
    pagination_class = StandardResultsSetPagination1
    filter_backends=(filters.OrderingFilter,)
    ordering_fields = ['timestamp','rating']
    ordering = ['-rating']
    serializer_class = Seller_rating_and_reviews_serializer

    def get_queryset(self):
        seller = self.request.query_params.get('seller_id')
        query_set = seller_rating_and_reviews.objects.all()
        query_set = query_set.filter(seller_id=seller)
        return query_set