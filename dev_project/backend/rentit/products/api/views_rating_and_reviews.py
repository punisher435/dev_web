from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework import filters
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework import mixins

from products.models import room_rating_and_reviews,shop_rating_and_reviews,apartment_rating_and_reviews
from .serializers import room_rating_and_reviews_serializer
from .serializers import shop_rating_and_reviews_serializer
from .serializers import apartment_rating_and_reviews_serializer


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000


class room_reviews(viewsets.ReadOnlyModelViewSet):

    pagination_class = StandardResultsSetPagination
    filter_backends=(filters.OrderingFilter,)
    ordering_fields = ['timestamp','rating']
    ordering = ['-rating']
    serializer_class = room_rating_and_reviews_serializer

    def get_queryset(self):
        room = self.request.query_params.get('room_id')
        query_set = room_rating_and_reviews.objects.all()
        query_set = query_set.filter(room_id=room)
        return query_set



class give_room_reviews(viewsets.ViewSet):

    @permission_classes([IsAuthenticated])
    def create(self,request):
        serializer = room_rating_and_reviews_serializer(data=request.data)
        if serializer.is_valid() and (not request.user.is_seller):
            serializer.validated_data["customer_id"]=request.user
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)

    @permission_classes([IsAuthenticated])
    def delete (self,request,pk=None):
        queryset = room_rating_and_reviews.objects.all()
        review = get_object_or_404(queryset,pk=pk)
        if review.customer_id==request.user:
            review.delete()
            return Response("Deleted",status=status.HTTP_200_OK)
        else:
            return Response("ERROR", status=status.HTTP_400_BAD_REQUEST)


class shop_reviews(viewsets.ReadOnlyModelViewSet):
    
    pagination_class = StandardResultsSetPagination
    filter_backends=(filters.OrderingFilter,)
    ordering_fields = ['timestamp','rating']
    ordering = ['-rating']

    serializer_class = shop_rating_and_reviews_serializer

    def get_queryset(self):
        shop = self.request.query_params.get('shop_id')
        query_set = shop_rating_and_reviews.objects.all()
        query_set = query_set.filter(shop_id=shop)
        return query_set

class give_shop_reviews(viewsets.ViewSet):

    @permission_classes([IsAuthenticated])
    def create(self,request):
        serializer = shop_rating_and_reviews_serializer(data=request.data)
        if serializer.is_valid() and (not request.user.is_seller):
            serializer.validated_data["customer_id"]=request.user
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)

    @permission_classes([IsAuthenticated])
    def delete (self,request,pk=None):
        queryset = shop_rating_and_reviews.objects.all()
        review = get_object_or_404(queryset,pk=pk)
        if review.customer_id==request.user:
            review.delete()
            return Response("Deleted",status=status.HTTP_200_OK)
        else:
            return Response("ERROR", status=status.HTTP_400_BAD_REQUEST)

        
class apartment_reviews(viewsets.ReadOnlyModelViewSet):
    
    pagination_class = StandardResultsSetPagination
    filter_backends=(filters.OrderingFilter,)
    ordering_fields = ['timestamp','rating']
    ordering = ['-rating']

    serializer_class = apartment_rating_and_reviews_serializer

    def get_queryset(self):
        apartment = self.request.query_params.get('apartment_id')
        query_set = apartment_rating_and_reviews.objects.all()
        query_set = query_set.filter(apartment_id=apartment)
        return query_set



class give_apartment_reviews(viewsets.ViewSet):
    
    @permission_classes([IsAuthenticated])
    def create(self,request):
        serializer = apartment_rating_and_reviews_serializer(data=request.data)
        if serializer.is_valid() and (not request.user.is_seller):
            serializer.validated_data["customer_id"]=request.user
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)

    @permission_classes([IsAuthenticated])
    def delete (self,request,pk=None):
        queryset = apartment_rating_and_reviews.objects.all()
        review = get_object_or_404(queryset,pk=pk)
        if review.customer_id==request.user:
            review.delete()
            return Response("Deleted",status=status.HTTP_200_OK)
        else:
            return Response("ERROR", status=status.HTTP_400_BAD_REQUEST)



