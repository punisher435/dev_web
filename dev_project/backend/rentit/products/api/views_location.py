from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser,FormParser
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework_simplejwt import authentication
from django.core.mail import send_mail
from django_filters import rest_framework as rest_filters
from rest_framework import filters
from rest_framework.pagination import PageNumberPagination

from .serializers import room_location
from products.models import rooms,shops,apartments
from rentit.settings import EMAIL_HOST_USER


class room_filter(rest_filters.FilterSet):
    min_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='gte')
    max_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='lte')
    min_rating = rest_filters.NumberFilter(field_name='avg_rating',lookup_expr='gte')
    windows_filter = rest_filters.NumberFilter(field_name='windows',lookup_expr='gte')
    capacity_filter = rest_filters.NumberFilter(field_name='capacity',lookup_expr='exact')
    floor_filter = rest_filters.NumberFilter(field_name='floor_no',lookup_expr='exact')
    trust_points_filter = rest_filters.NumberFilter(field_name='trust_points',lookup_expr='gte')
    bookedtill_filter = rest_filters.DateFilter(field_name='bookedtill', lookup_expr='gte')

    class Meta:
        model = rooms
        fields = ['room_cleaning','windows_filter','bookedtill_filter','nonveg_food','veg_food','guest_allowed','iron','laundry','cooler','AC','room_TV','power_backup','floor_filter','purified_water','min_rating','cctv_building','bed_type','building_guard','balcony','separate_washroom','category','location','city','state','wifi','breakfast','lunch','dinner','house_TV','power_backup','geyser','electricity','country','min_price','max_price','capacity_filter','trust_points_filter','booked']


class room_location_viewset(viewsets.ReadOnlyModelViewSet):
    filter_backends=(rest_filters.DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter,)
    filterset_class = room_filter
    search_fields = ['^category','^location','^city','^state','^country','^pincode']
    ordering_fields = ['final_price','capacity','trust_points','avg_rating']
    ordering = ['-trust_points']

    query_set = rooms.objects.all()
    query_set = query_set.filter(verified=True)
    queryset = query_set.filter(removed=False)
    serializer_class = room_location
