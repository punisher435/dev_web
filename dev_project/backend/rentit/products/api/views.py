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


from .serializers import room_list_serializer,room_detail_serializer,room_rating_and_reviews_serializer
from products.models import rooms,shops,apartments
from rentit.settings import EMAIL_HOST_USER
from .serializers import shop_list_serializer,shop_detail_serializer,shop_rating_and_reviews_serializer
from .serializers import apartment_list_serializer,apartment_detail_serializer,apartment_rating_and_reviews_serializer

from products.models import minmax_room,minmax_shop,minmax_apartment
from .serializers import minmax_room_serializer,minmax_shop_serializer,minmax_apartment_serializer

#pagination

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 3


#filters


class room_filter(rest_filters.FilterSet):
    min_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='gte')
    max_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='lte')
    min_rating = rest_filters.NumberFilter(field_name='avg_rating',lookup_expr='gte')
    windows_filter = rest_filters.NumberFilter(field_name='windows',lookup_expr='gte')
    capacity_filter = rest_filters.NumberFilter(field_name='capacity',lookup_expr='exact')
    floor_filter = rest_filters.NumberFilter(field_name='floor_no',lookup_expr='exact')
    trust_points_filter = rest_filters.NumberFilter(field_name='trust_points',lookup_expr='gte')
    bookedtill_filter = rest_filters.DateFilter(field_name='bookedtill', lookup_expr='lt')

    class Meta:
        model = rooms
        fields = ['room_cleaning','windows_filter','bookedtill_filter','nonveg_food','veg_food','guest_allowed','iron','laundry','cooler','AC','room_TV','power_backup','floor_filter','purified_water','min_rating','cctv_building','bed_type','building_guard','balcony','separate_washroom','category','location','city','state','wifi','breakfast','lunch','dinner','house_TV','power_backup','geyser','electricity','country','min_price','max_price','capacity_filter','trust_points_filter','booked']


class room_viewset(viewsets.ReadOnlyModelViewSet):
    parser_classes=(MultiPartParser,FormParser)
    filter_backends=(rest_filters.DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter,)
    pagination_class = StandardResultsSetPagination
    filterset_class = room_filter
    search_fields = ['^category','^location','^city','^state','^country','^pincode']
    ordering_fields = ['final_price','capacity','trust_points','avg_rating']
    ordering = ['-trust_points']

    query_set = rooms.objects.all()
    query_set = query_set.filter(verified=True)
    queryset = query_set.filter(removed=False)
    serializer_class = room_list_serializer





class my_room_viewset(viewsets.ViewSet):
    
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)

    def list(self,request,format=None):
        queryset = rooms.personal_rooms.get_seller_rooms(request.user)
        serializer = room_list_serializer(queryset,many=True)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def retrieve(self,request,pk=None,format=None):
        queryset = rooms.personal_rooms.get_seller_rooms(request.user)
        room = get_object_or_404(queryset,pk=pk)
        serializer = room_detail_serializer(room)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def create(self,request,format=None):
        serializer = room_detail_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True) and request.user.is_seller:
            serializer.validated_data["seller_id"]=request.user
            x=serializer.validated_data["price"]
            y=serializer.validated_data["owner_discount"]
            serializer.validated_data["final_price"]=(x-(((y)*x)/100))
            
            serializer.save()

            subject = 'Room Added'
            message = 'Your room has been added'
            recepient = request.user
            send_mail(subject,message, EMAIL_HOST_USER, [recepient], fail_silently=False)

            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)


    def update(self, request,pk=None,format=None):
        serializer = room_detail_serializer(data=request.data,partial=True)
        queryset = rooms.personal_rooms.get_seller_rooms(request.user)
        room = get_object_or_404(queryset,pk=pk)
        if serializer.is_valid(raise_exception=True):
            if room.price!=serializer.validated_data["price"]: 
                room.price=serializer.validated_data["price"]

            if room.owner_discount!=serializer.validated_data["owner_discount"]: 
                room.owner_discount=serializer.validated_data["owner_discount"]

            if room.furniture!=serializer.validated_data["furniture"]: 
                room.furniture=serializer.validated_data["furniture"]

            if room.capacity!=serializer.validated_data["capacity"]: 
                room.capacity=serializer.validated_data["capacity"]

            if room.photo1!=serializer.validated_data["photo1"]: 
                room.photo1=serializer.validated_data["photo1"]

            if room.photo2!=serializer.validated_data["photo2"]: 
                room.photo2=serializer.validated_data["photo2"]

            if room.photo3!=serializer.validated_data["photo3"]: 
                room.photo3=serializer.validated_data["photo3"]

            if room.photo4!=serializer.validated_data["photo4"]: 
                room.photo4=serializer.validated_data["photo4"]
            
            if room.photo5!=serializer.validated_data["photo5"]: 
                room.photo5=serializer.validated_data["photo5"]

            if room.booked!=serializer.validated_data["booked"]: 
                room.booked=serializer.validated_data["booked"]

            if room.facility!=serializer.validated_data["facility"]: 
                room.facility=serializer.validated_data["facility"]

            if room.description!=serializer.validated_data["description"]: 
                room.description=serializer.validated_data["description"]

            if room.electricity!=serializer.validated_data["electricity"]: 
                room.electricity=serializer.validated_data["electricity"]
            
            if room.water_facility!=serializer.validated_data["water_facility"]: 
                room.water_facility=serializer.validated_data["water_facility"]

            if room.house_TV!=serializer.validated_data["house_TV"]: 
                room.house_TV=serializer.validated_data["house_TV"]

            if room.power_backup!=serializer.validated_data["power_backup"]: 
                room.power_backup=serializer.validated_data["power_backup"]

            if room.geyser!=serializer.validated_data["geyser"]: 
                room.geyser=serializer.validated_data["geyser"]

            if room.nearby_station1!=serializer.validated_data["nearby_station1"]: 
                room.nearby_station1=serializer.validated_data["nearby_station1"]
            
            if room.nearby_station2!=serializer.validated_data["nearby_station2"]: 
                room.nearby_station2=serializer.validated_data["nearby_station2"]

            if room.nearby_restaurant1!=serializer.validated_data["nearby_restaurant1"]: 
                room.nearby_restaurant1=serializer.validated_data["nearby_restaurant1"]

            if room.nearby_restaurant2!=serializer.validated_data["nearby_restaurant2"]: 
                room.nearby_restaurant2=serializer.validated_data["nearby_restaurant2"]

            if room.wifi!=serializer.validated_data["wifi"]: 
                room.wifi=serializer.validated_data["wifi"]

            if room.breakfast!=serializer.validated_data["breakfast"]: 
                room.breakfast=serializer.validated_data["breakfast"]
            
            if room.lunch!=serializer.validated_data["lunch"]: 
                room.lunch=serializer.validated_data["lunch"]

            if room.dinner!=serializer.validated_data["dinner"]: 
                room.dinner=serializer.validated_data["dinner"]
            
            if room.room_policy!=serializer.validated_data["room_policy"]: 
                room.room_policy=serializer.validated_data["room_policy"]

            

            x=serializer.validated_data["price"]
            y=serializer.validated_data["owner_discount"]
            z=room.company_discount
            room.final_price=(x-(((y+z)*x)/100))
            
            room.save()
            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)

    def destroy(self,request,pk=None):
        queryset = rooms.personal_rooms.get_seller_rooms(request.user)
        room = get_object_or_404(queryset,pk=pk)
        room.delete()

        subject = 'Room Deleted'
        message = 'Your room has been deleted'
        recepient = request.user
        send_mail(subject,message, EMAIL_HOST_USER, [recepient], fail_silently=False)

        return Response("Deleted",status=status.HTTP_200_OK)


class minmax_room_viewset(viewsets.ReadOnlyModelViewSet):
    queryset = minmax_room.objects.all()
    serializer_class = minmax_room_serializer



#shops

class shop_filter(rest_filters.FilterSet):
    min_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='gte')
    max_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='lte')
    trust_points_filter = rest_filters.NumberFilter(field_name='trust_points',lookup_expr='gte')
    bookedtill_filter = rest_filters.DateFilter(field_name='bookedtill', lookup_expr='gte')


    class Meta:
        model = shops
        fields = ['shop_cleaning','bookedtill_filter','water_facility','wifi','power_backup','electricity','category','location','city','state','country','pincode','min_price','max_price','trust_points_filter','booked']

            
class shop_viewset(viewsets.ReadOnlyModelViewSet):
    parser_classes=(MultiPartParser,FormParser)
    filter_backends=(rest_filters.DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter,)
    pagination_class = StandardResultsSetPagination
    filterset_class = shop_filter
    search_fields = ['^category','^location','^city','=state','=country','=pincode']
    ordering_fields = ['final_price','trust_points','avg_rating']
    ordering = ['-trust_points']

    query_set = shops.objects.all()
    query_set = query_set.filter(verified=True)
    queryset = query_set.filter(removed=False)
    serializer_class = shop_list_serializer




class my_shop_viewset(viewsets.ViewSet):
    
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)

    def list(self,request,format=None):
        queryset = shops.personal_shops.get_seller_shops(request.user)
        serializer = shop_list_serializer(queryset,many=True)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def retrieve(self,request,pk=None,format=None):
        queryset = shops.personal_shops.get_seller_shops(request.user)
        shop = get_object_or_404(queryset,pk=pk)
        serializer = shop_detail_serializer(shop)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def create(self,request,format=None):
        serializer = shop_detail_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True) and request.user.is_seller:
            serializer.validated_data["seller_id"]=request.user
            x=serializer.validated_data["price"]
            y=serializer.validated_data["owner_discount"]
            z=serializer.validated_data["company_discount"]
            serializer.validated_data["final_price"]=(x-(((y+z)*x)/100))
            serializer.save()

            subject = 'Shop Added'
            message = 'Your shop has been added'
            recepient = request.user
            send_mail(subject,message, EMAIL_HOST_USER, [recepient], fail_silently=False)

            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)


    def update(self, request,pk=None,format=None):
        serializer = shop_detail_serializer(data=request.data,partial=True)
        queryset = shops.personal_rooms.get_seller_shops(request.user)
        shop = get_object_or_404(queryset,pk=pk)
        if serializer.is_valid(raise_exception=True):
            if shop.price!=serializer.validated_data["price"]: 
                shop.price=serializer.validated_data["price"]

            if shop.owner_discount!=serializer.validated_data["owner_discount"]: 
                shop.owner_discount=serializer.validated_data["owner_discount"]

            if shop.furniture!=serializer.validated_data["furniture"]: 
                shop.furniture=serializer.validated_data["furniture"]

            if shop.photo1!=serializer.validated_data["photo1"]: 
                shop.photo1=serializer.validated_data["photo1"]

            if shop.photo2!=serializer.validated_data["photo2"]: 
                shop.photo2=serializer.validated_data["photo2"]

            if shop.photo3!=serializer.validated_data["photo3"]: 
                shop.photo3=serializer.validated_data["photo3"]

            if shop.photo4!=serializer.validated_data["photo4"]: 
                shop.photo4=serializer.validated_data["photo4"]
            
            if shop.photo5!=serializer.validated_data["photo5"]: 
                shop.photo5=serializer.validated_data["photo5"]

            if shop.booked!=serializer.validated_data["booked"]: 
                shop.booked=serializer.validated_data["booked"]

            if shop.facility!=serializer.validated_data["facility"]: 
                shop.facility=serializer.validated_data["facility"]

            if shop.description!=serializer.validated_data["description"]: 
                shop.description=serializer.validated_data["description"]

            if shop.electricity!=serializer.validated_data["electricity"]: 
                shop.electricity=serializer.validated_data["electricity"]
            
            if shop.water_facility!=serializer.validated_data["water_facility"]: 
                shop.water_facility=serializer.validated_data["water_facility"]

            if shop.power_backup!=serializer.validated_data["power_backup"]: 
                shop.power_backup=serializer.validated_data["power_backup"]

            if shop.nearby_station1!=serializer.validated_data["nearby_station1"]: 
                shop.nearby_station1=serializer.validated_data["nearby_station1"]
            
            if shop.nearby_station2!=serializer.validated_data["nearby_station2"]: 
                shop.nearby_station2=serializer.validated_data["nearby_station2"]

            if shop.wifi!=serializer.validated_data["wifi"]: 
                shop.wifi=serializer.validated_data["wifi"]
            
            if shop.room_policy!=serializer.validated_data["shop_policy"]: 
                shop.room_policy=serializer.validated_data["shop_policy"]

            x=serializer.validated_data["price"]
            y=serializer.validated_data["owner_discount"]
            z=shop.company_discount
            shop.final_price=(x-(((y+z)*x)/100))
            
            shop.save()
            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)

    def destroy(self,request,pk=None):
        queryset = shops.personal_shops.get_seller_shops(request.user)
        shop = get_object_or_404(queryset,pk=pk)
        shop.delete()

        subject = 'Shop Deleted'
        message = 'Your shop has been deleted'
        recepient = request.user
        send_mail(subject,message, EMAIL_HOST_USER, [recepient], fail_silently=False)

        return Response("Deleted",status=status.HTTP_200_OK)


class minmax_shop_viewset(viewsets.ReadOnlyModelViewSet):
    queryset = minmax_shop.objects.all()
    serializer_class = minmax_shop_serializer



# apartments


class apartment_filter(rest_filters.FilterSet):
    min_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='gte')
    max_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='lte')
    BHK_filter = rest_filters.NumberFilter(field_name='BHK',lookup_expr='exact')
    trust_points_filter = rest_filters.NumberFilter(field_name='trust_points',lookup_expr='gte')
    bookedtill_filter = rest_filters.DateFilter(field_name='bookedtill', lookup_expr='gte')


    class Meta:
        model = apartments
        fields = ['apartment_cleaning','bookedtill_filter','geyser','power_backup','TV','water_facility','electricity','category','location','city','state','country','pincode','min_price','max_price','BHK_filter','trust_points_filter','booked']


class apartment_viewset(viewsets.ReadOnlyModelViewSet):
    parser_classes=(MultiPartParser,FormParser)
    filter_backends=(rest_filters.DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter,)
    pagination_class = StandardResultsSetPagination
    filterset_class = apartment_filter
    search_fields = ['^category','^location','^city','=state','=country','=pincode']
    ordering_fields = ['final_price','BHK','trust_points','avg_rating']
    ordering = ['-trust_points']

    query_set = apartments.objects.all()
    query_set = query_set.filter(verified=True)
    queryset = query_set.filter(removed=False)
    serializer_class = apartment_list_serializer
 

class my_apartment_viewset(viewsets.ViewSet):
    
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)

    def list(self,request,format=None):
        queryset = apartments.personal_apartments.get_seller_apartments(request.user)
        serializer = apartment_list_serializer(queryset,many=True)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def retrieve(self,request,pk=None,format=None):
        queryset = apartments.personal_apartments.get_seller_apartments(request.user)
        apartment = get_object_or_404(queryset,pk=pk)
        serializer = apartment_detail_serializer(apartment)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def create(self,request,format=None):
        serializer = apartment_detail_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True) and request.user.is_seller:
            serializer.validated_data["seller_id"]=request.user
            x=serializer.validated_data["price"]
            y=serializer.validated_data["owner_discount"]
            z=serializer.validated_data["company_discount"]
            serializer.validated_data["final_price"]=(x-(((y+z)*x)/100))
            serializer.save()

            subject = 'Apartment Added'
            message = 'Your Apartment has been added'
            recepient = request.user
            send_mail(subject,message, EMAIL_HOST_USER, [recepient], fail_silently=False)

            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)


    def update(self, request,pk=None,format=None):
        serializer = apartment_detail_serializer(data=request.data,partial=True)
        queryset = apartments.personal_apartments.get_seller_apartments(request.user)
        apartment = get_object_or_404(queryset,pk=pk)
        if serializer.is_valid(raise_exception=True):
            if apartment.price!=serializer.validated_data["price"]: 
                apartment.price=serializer.validated_data["price"]

            if apartment.owner_discount!=serializer.validated_data["owner_discount"]: 
                apartment.owner_discount=serializer.validated_data["owner_discount"]

            if apartment.furniture!=serializer.validated_data["furniture"]: 
                apartment.furniture=serializer.validated_data["furniture"]

            if apartment.BHK!=serializer.validated_data["BHK"]: 
                apartment.BHK=serializer.validated_data["BHK"]

            if apartment.photo1!=serializer.validated_data["photo1"]: 
                apartment.photo1=serializer.validated_data["photo1"]

            if apartment.photo2!=serializer.validated_data["photo2"]: 
                apartment.photo2=serializer.validated_data["photo2"]

            if apartment.photo3!=serializer.validated_data["photo3"]: 
                apartment.photo3=serializer.validated_data["photo3"]

            if apartment.photo4!=serializer.validated_data["photo4"]: 
                apartment.photo4=serializer.validated_data["photo4"]
            
            if apartment.photo5!=serializer.validated_data["photo5"]: 
                apartment.photo5=serializer.validated_data["photo5"]

            if apartment.booked!=serializer.validated_data["booked"]: 
                apartment.booked=serializer.validated_data["booked"]

            if apartment.facility!=serializer.validated_data["facility"]: 
                apartment.facility=serializer.validated_data["facility"]

            if apartment.description!=serializer.validated_data["description"]: 
                apartment.description=serializer.validated_data["description"]

            if apartment.electricity!=serializer.validated_data["electricity"]: 
                apartment.electricity=serializer.validated_data["electricity"]
            
            if apartment.water_facility!=serializer.validated_data["water_facility"]: 
                apartment.water_facility=serializer.validated_data["water_facility"]

            if apartment.power_backup!=serializer.validated_data["power_backup"]: 
                apartment.power_backup=serializer.validated_data["power_backup"]

            if apartment.geyser!=serializer.validated_data["geyser"]: 
                apartment.geyser=serializer.validated_data["geyser"]

            if apartment.nearby_station1!=serializer.validated_data["nearby_station1"]: 
                apartment.nearby_station1=serializer.validated_data["nearby_station1"]
            
            if apartment.nearby_station2!=serializer.validated_data["nearby_station2"]: 
                apartment.nearby_station2=serializer.validated_data["nearby_station2"]

            if apartment.nearby_restaurant1!=serializer.validated_data["nearby_restaurant1"]: 
                apartment.nearby_restaurant1=serializer.validated_data["nearby_restaurant1"]

            if apartment.nearby_restaurant2!=serializer.validated_data["nearby_restaurant2"]: 
                apartment.nearby_restaurant2=serializer.validated_data["nearby_restaurant2"]

            if apartment.wifi!=serializer.validated_data["wifi"]: 
                apartment.wifi=serializer.validated_data["wifi"]
            
            if apartment.room_policy!=serializer.validated_data["apartment_policy"]: 
                apartment.room_policy=serializer.validated_data["apartment_policy"]


            x=serializer.validated_data["price"]
            y=serializer.validated_data["owner_discount"]
            z=apartment.company_discount
            apartment.final_price=(x-(((y+z)*x)/100))
            
            apartment.save()
            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
        else:
            return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)

    def destroy(self,request,pk=None):
        queryset = apartments.personal_apartments.get_seller_apartments(request.user)
        apartment = get_object_or_404(queryset,pk=pk)
        apartment.delete()

        subject = 'Apartment Deleted'
        message = 'Your apartment has been deleted'
        recepient = request.user
        send_mail(subject,message, EMAIL_HOST_USER, [recepient], fail_silently=False)

        return Response("Deleted",status=status.HTTP_200_OK)
    
class minmax_apartment_viewset(viewsets.ReadOnlyModelViewSet):
    queryset = minmax_apartment.objects.all()
    serializer_class = minmax_apartment_serializer