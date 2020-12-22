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


from .serializers import room_list_serializer,room_detail_serializer,room_rating_and_reviews_serializer
from products.models import rooms,shops,apartments
from rentit.settings import EMAIL_HOST_USER
from .serializers import shop_list_serializer,shop_detail_serializer,shop_rating_and_reviews_serializer
from .serializers import apartment_list_serializer,apartment_detail_serializer,apartment_rating_and_reviews_serializer




class room_filter(rest_filters.FilterSet):
    min_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='gte')
    max_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='lte')
    capacity_filter = rest_filters.NumberFilter(field_name='capacity',lookup_expr='exact')
    trust_points_filter = rest_filters.NumberFilter(field_name='trust_points',lookup_expr='lte')

    class Meta:
        model = rooms
        fields = ['category','location','city','state','country','pincode','min_price','max_price','capacity_filter','trust_points_filter','booked']




class room_viewset(viewsets.ViewSet):

    parser_classes=(MultiPartParser,FormParser)
    filter_backends=(rest_filters.DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter,)
    filterset_class = room_filter
    search_fields = ['^category','^location','^city','=state','=country','=pincode']
    ordering_fields = ['final_price','capacity','trust_points','avg_rating']

    def list(self,request):
        queryset = rooms.objects.all()
        queryset = queryset.filter(verified=True)
        queryset = queryset.filter(removed=False)
        serializer = room_list_serializer(queryset,many=True)
        return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

    def retrieve(self,request,pk=None):
        queryset = rooms.objects.all()
        queryset = queryset.filter(verified=True)
        queryset = queryset.filter(removed=False)
        room = get_object_or_404(queryset,pk=pk)
        serializer = room_detail_serializer(room)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

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
        if serializer.is_valid(raise_exception=True) and not request.user.is_seller:
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

            if room.booked!=serializer.validated_data["booked"]: 
                room.booked=serializer.validated_data["booked"]

            if room.facility!=serializer.validated_data["facility"]: 
                room.facility=serializer.validated_data["facility"]

            if room.description!=serializer.validated_data["description"]: 
                room.description=serializer.validated_data["description"]

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



#shops

class shop_filter(rest_filters.FilterSet):
    min_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='gte')
    max_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='lte')
    trust_points_filter = rest_filters.NumberFilter(field_name='trust_points',lookup_expr='lte')

    class Meta:
        model = shops
        fields = ['category','location','city','state','country','pincode','min_price','max_price','trust_points_filter','booked']

            
class shop_viewset(viewsets.ViewSet):
    
    parser_classes=(MultiPartParser,FormParser)
    filter_backends=(rest_filters.DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter,)
    filterset_class = shop_filter
    search_fields = ['^category','^location','^city','=state','=country','=pincode']
    ordering_fields = ['final_price','trust_points','avg_rating']

    def list(self,request):
        queryset = shops.objects.all()
        queryset = queryset.filter(verified=True)
        queryset = queryset.filter(removed=False)
        serializer = shop_list_serializer(queryset,many=True)
        return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

    def retrieve(self,request,pk=None):
        queryset = shops.objects.all()
        queryset = queryset.filter(verified=True)
        queryset = queryset.filter(removed=False)
        shop = get_object_or_404(queryset,pk=pk)
        serializer = shop_detail_serializer(shop)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)



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
        if serializer.is_valid(raise_exception=True) and not request.user.is_seller:
            serializer.validated_data["seller_id"]=request.user
            x=serializer.validated_data["price"]
            y=serializer.validated_data["owner_discount"]
            serializer.validated_data["final_price"]=(x-(((y)*x)/100))
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

            if shop.booked!=serializer.validated_data["booked"]: 
                shop.booked=serializer.validated_data["booked"]

            if shop.facility!=serializer.validated_data["facility"]: 
                shop.facility=serializer.validated_data["facility"]

            if shop.description!=serializer.validated_data["description"]: 
                shop.description=serializer.validated_data["description"]

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



# apartments


class apartment_filter(rest_filters.FilterSet):
    min_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='gte')
    max_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='lte')
    BHK_filter = rest_filters.NumberFilter(field_name='BHK',lookup_expr='exact')
    trust_points_filter = rest_filters.NumberFilter(field_name='trust_points',lookup_expr='lte')

    class Meta:
        model = rooms
        fields = ['category','location','city','state','country','pincode','min_price','max_price','BHK_filter','trust_points_filter','booked']


class apartment_viewset(viewsets.ViewSet):
    
    parser_classes=(MultiPartParser,FormParser)
    filter_backends=(rest_filters.DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter,)
    filterset_class = apartment_filter
    search_fields = ['^category','^location','^city','=state','=country','=pincode']
    ordering_fields = ['final_price','BHK','trust_points','avg_rating']

    def list(self,request):
        queryset = apartments.objects.all()
        queryset = queryset.filter(verified=True)
        queryset = queryset.filter(removed=False)
        serializer = apartment_list_serializer(queryset,many=True)
        return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

    def retrieve(self,request,pk=None):
        queryset = apartments.objects.all()
        queryset = queryset.filter(verified=True)
        queryset = queryset.filter(removed=False)
        apartment = get_object_or_404(queryset,pk=pk)
        serializer = apartment_detail_serializer(apartment)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    

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
        if serializer.is_valid(raise_exception=True) and not request.user.is_seller:
            serializer.validated_data["seller_id"]=request.user
            x=serializer.validated_data["price"]
            y=serializer.validated_data["owner_discount"]
            serializer.validated_data["final_price"]=(x-(((y)*x)/100))
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

            if apartment.booked!=serializer.validated_data["booked"]: 
                apartment.booked=serializer.validated_data["booked"]

            if apartment.facility!=serializer.validated_data["facility"]: 
                apartment.facility=serializer.validated_data["facility"]

            if apartment.description!=serializer.validated_data["description"]: 
                apartment.description=serializer.validated_data["description"]

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