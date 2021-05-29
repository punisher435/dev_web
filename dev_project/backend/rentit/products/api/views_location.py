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

from .serializers import room_location,shop_location,apartment_location
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
    balcony_filter = rest_filters.NumberFilter(field_name='balcony',lookup_expr='gte')
    bookedtill_filter = rest_filters.DateFilter(field_name='bookedtill', lookup_expr='lt')
    discount = rest_filters.NumberFilter(field_name='net_discount',lookup_expr='gte')

    city1 = rest_filters.CharFilter(method='get_city',field_name='net_discount')
    state1 = rest_filters.CharFilter(method='get_state',field_name='net_discount')
    country1 = rest_filters.CharFilter(method='get_country',field_name='net_discount')
    landmark1 = rest_filters.CharFilter(method='get_landmark',field_name='net_discount')
    pincode1 = rest_filters.CharFilter(method='get_pincode',field_name='net_discount')
    location1 = rest_filters.CharFilter(method='get_location',field_name='net_discount')
    district1 = rest_filters.CharFilter(method='get_district',field_name='net_discount')

    def get_city(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(city__icontains=value)
        return queryset

    def get_state(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(state__icontains=value)
        return queryset
    def get_district(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(district__icontains=value)
        return queryset
    def get_country(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(country__icontains=value)
        return queryset

    def get_landmark(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(landmark__icontains=value)
        return queryset

    def get_pincode(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(pincode__icontains=value)
        return queryset

    def get_location(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(location__icontains=value)
        return queryset

    class Meta:
        model = rooms
        fields = ['room_cleaning','landmark1','discount','gender','windows_filter','bookedtill_filter','nonveg_food','veg_food','guest_allowed','iron','laundry','cooler','AC','room_TV','power_backup','floor_filter','purified_water','min_rating','cctv_building','bed_type','building_guard','balcony_filter','separate_washroom','category','location1','city1','state1','country1','pincode1','wifi','breakfast','lunch','dinner','house_TV','power_backup','geyser','electricity','country1','min_price','max_price','capacity_filter','trust_points_filter','booked']


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


class shop_filter(rest_filters.FilterSet):
    windows_filter = rest_filters.NumberFilter(field_name='windows',lookup_expr='gte')
    
    floor_filter = rest_filters.NumberFilter(field_name='floor_no',lookup_expr='exact')
    room_filter = rest_filters.NumberFilter(field_name='total_rooms',lookup_expr='exact')
    min_rating = rest_filters.NumberFilter(field_name='avg_rating',lookup_expr='gte')
    min_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='gte')
    max_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='lte')
    trust_points_filter = rest_filters.NumberFilter(field_name='trust_points',lookup_expr='gte')
    bookedtill_filter = rest_filters.DateFilter(field_name='bookedtill', lookup_expr='lt')
    washroom_filter = rest_filters.NumberFilter(field_name='washroom',lookup_expr='gte')
    balcony_filter = rest_filters.NumberFilter(field_name='balcony',lookup_expr='gte')
    windows_filter = rest_filters.NumberFilter(field_name='windows',lookup_expr='gte')
    discount = rest_filters.NumberFilter(field_name='net_discount',lookup_expr='gte')

    city1 = rest_filters.CharFilter(method='get_city',field_name='net_discount')
    state1 = rest_filters.CharFilter(method='get_state',field_name='net_discount')
    country1 = rest_filters.CharFilter(method='get_country',field_name='net_discount')
    landmark1 = rest_filters.CharFilter(method='get_landmark',field_name='net_discount')
    pincode1 = rest_filters.CharFilter(method='get_pincode',field_name='net_discount')
    location1 = rest_filters.CharFilter(method='get_location',field_name='net_discount')
    district1 = rest_filters.CharFilter(method='get_district',field_name='net_discount')

    def get_city(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(city__icontains=value)
        return queryset

    def get_state(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(state__icontains=value)
        return queryset

    def get_district(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(district__icontains=value)
        return queryset

    def get_country(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(country__icontains=value)
        return queryset

    def get_landmark(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(landmark__icontains=value)
        return queryset

    def get_pincode(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(pincode__icontains=value)
        return queryset

    def get_location(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(location__icontains=value)
        return queryset

    

    class Meta:
        model = shops
        fields = ['shop_cleaning','discount','gender','city1','state1','country1','landmark1','pincode1','location','cctv_building','AC','cooler','TV','building_guard','min_rating','separate_washroom','purified_water','floor_filter','room_filter','windows_filter','bookedtill_filter','water_facility','wifi','power_backup','electricity','category','min_price','max_price','trust_points_filter','booked']

            
class shop_location_viewset(viewsets.ReadOnlyModelViewSet):
    parser_classes=(MultiPartParser,FormParser)
    filter_backends=(rest_filters.DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter,)
   
    filterset_class = shop_filter
    search_fields = ['^category','^location','^city','^landmark','^state','^country','^pincode']
    ordering_fields = ['final_price','capacity','trust_points','avg_rating']
    ordering = ['-trust_points']

    query_set = shops.objects.all()
    query_set = query_set.filter(verified=True)
    query_set = query_set.filter(pausebooking=False)
    queryset = query_set.filter(removed=False)
    serializer_class = shop_location


class apartment_filter(rest_filters.FilterSet):
    min_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='gte')
    max_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='lte')
    BHK_filter = rest_filters.NumberFilter(field_name='BHK',lookup_expr='exact')
    trust_points_filter = rest_filters.NumberFilter(field_name='trust_points',lookup_expr='gte')
    bookedtill_filter = rest_filters.DateFilter(field_name='bookedtill', lookup_expr='lte')
    min_rating = rest_filters.NumberFilter(field_name='avg_rating',lookup_expr='gte')
    floor_filter = rest_filters.NumberFilter(field_name='floor_no',lookup_expr='exact')
    room_filter = rest_filters.NumberFilter(field_name='total_rooms',lookup_expr='gte')
    beds_filter = rest_filters.NumberFilter(field_name='total_beds',lookup_expr='gte')
    AC_filter = rest_filters.NumberFilter(field_name='total_AC',lookup_expr='gte')
    cooler_filter = rest_filters.NumberFilter(field_name='total_cooler',lookup_expr='gte')
    TV_filter = rest_filters.NumberFilter(field_name='total_TV',lookup_expr='gte')
    geyser_filter = rest_filters.NumberFilter(field_name='total_geyser',lookup_expr='gte')
    washroom_filter = rest_filters.NumberFilter(field_name='washroom',lookup_expr='gte')
    windows_filter = rest_filters.NumberFilter(field_name='windows',lookup_expr='gte')
    balcony_filter = rest_filters.NumberFilter(field_name='balcony',lookup_expr='gte')
    discount = rest_filters.NumberFilter(field_name='net_discount',lookup_expr='gte')

    city1 = rest_filters.CharFilter(method='get_city',field_name='net_discount')
    state1 = rest_filters.CharFilter(method='get_state',field_name='net_discount')
    country1 = rest_filters.CharFilter(method='get_country',field_name='net_discount')
    landmark1 = rest_filters.CharFilter(method='get_landmark',field_name='net_discount')
    pincode1 = rest_filters.CharFilter(method='get_pincode',field_name='net_discount')
    location1 = rest_filters.CharFilter(method='get_location',field_name='net_discount')
    district1 = rest_filters.CharFilter(method='get_district',field_name='net_discount')

    def get_city(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(city__icontains=value)
        return queryset

    def get_state(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(state__icontains=value)
        return queryset

    def get_district(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(district__icontains=value)
        return queryset

    def get_country(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(country__icontains=value)
        return queryset

    def get_landmark(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(landmark__icontains=value)
        return queryset

    def get_pincode(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(pincode__icontains=value)
        return queryset

    def get_location(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(location__icontains=value)
        return queryset

   
    

    class Meta:
        model = apartments
        fields = ['apartment_cleaning','discount','gender','geyser_filter','washroom_filter','bed_type','laundry','TV','geyser','purified_water','cooler','house_refridgerator','AC','apartment_type','sofa','floor_filter','room_filter','balcony_filter','washroom','cctv_building','building_guard','min_rating','bookedtill_filter','geyser','power_backup','TV','water_facility','electricity','category','location1','city1','state1','country1','landmark1','pincode1','min_price','max_price','BHK_filter','trust_points_filter','booked']


class apartment_location_viewset(viewsets.ReadOnlyModelViewSet):
    parser_classes=(MultiPartParser,FormParser)
    filter_backends=(rest_filters.DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter,)
    filterset_class = apartment_filter

    search_fields = ['^category','^location','^city','^landmark','^state','^country','^pincode']
    ordering_fields = ['final_price','BHK','trust_points','avg_rating']
    ordering = ['-trust_points']

    query_set = apartments.objects.all()
    query_set = query_set.filter(verified=True)
    query_set = query_set.filter(pausebooking=False)
    queryset = query_set.filter(removed=False)
    serializer_class = apartment_location


