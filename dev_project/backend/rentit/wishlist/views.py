from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework_simplejwt import authentication
from rest_framework.parsers import MultiPartParser,FormParser
from django.shortcuts import get_object_or_404
from django.db.models import Q
from itertools import chain

# Create your views here.

from products.models import rooms,shops,apartments
from products.api.serializers import room_list_serializer
from products.api.serializers import shop_list_serializer
from products.api.serializers import apartment_list_serializer
from .models import wishlist



class wishlist_room(viewsets.ViewSet):

    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)

    def list(self, request,format=None):
        
        
        try:
            wishlist_object = get_object_or_404(queryset,pk=request.user.pk)

            query_set = rooms.objects.filter(Q(room_id__in=wishlist_object.room_wishlist.all()))
            
            serializer = room_list_serializer(query_set,context={'request':request},many=True)

            #print(serializer.data)

            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        except:
            return Response('Error while loading wishlist',status=status.HTTP_200_OK)

    def create(self,request):

        #query params as room_id 

        roomid= request.query_params.get('room_id')
        room = get_object_or_404(rooms.objects.all(),room_id=roomid)

        #user wishlist

        #operations

        try:
            wishlist_object = wishlist.objects.get(pk=request.user.pk)
            if room not in wishlist_object.room_wishlist.all():
                wishlist_object.room_wishlist.add(room)
                wishlist_object.items=wishlist_object.items+1
                wishlist_object.save()
                room.wishlist=room.wishlist+1;
                room.save()
            return Response('Added to wishlist', status=status.HTTP_202_ACCEPTED)
            
        except: 
            wishlist_object = wishlist(user_id=request.user)
            wishlist_object.save()
            if room not in wishlist_object.room_wishlist.all():
                wishlist_object.room_wishlist.add(room)
                wishlist_object.items=wishlist_object.items+1
                wishlist_object.save()
                room.wishlist=room.wishlist+1;
                room.save()
            return Response('Added to wishlist', status=status.HTTP_202_ACCEPTED)

    def destroy(self,request,pk=None):

        room = get_object_or_404(rooms.objects.all(),pk=pk)

        try:
            wishlist_object = wishlist.objects.get(pk=request.user.pk)
            wishlist_object.room_wishlist.remove(room)
            wishlist_object.items=wishlist_object.items-1
            wishlist_object.save()
            room.wishlist=room.wishlist-1;
            room.save()
            return Response('Removed from wishlist', status=status.HTTP_202_ACCEPTED)

        except:
            return Response('Error while removing from wishlist',status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request,pk=None):

        room = get_object_or_404(rooms.objects.all(),pk=pk)

        try:
            wishlist_object = wishlist.objects.get(pk=request.user.pk)
            if room in wishlist_object.room_wishlist.all():
                return Response(True, status=status.HTTP_202_ACCEPTED)
            else:
                return Response(False, status=status.HTTP_400_BAD_REQUEST)
            

        except:
            return Response(False,status=status.HTTP_400_BAD_REQUEST)

    def update(self,request,pk=None):
        
        try:
            wishlist_object = wishlist.objects.get(pk=request.user.pk)
            return Response(wishlist_object.items, status=status.HTTP_202_ACCEPTED)
        except:
            return Response(0,status=status.HTTP_400_BAD_REQUEST)




#shop wishlist object


class wishlist_shop(viewsets.ViewSet):
    
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)

    def list(self, request,format=None):
        queryset = wishlist.objects.all()
        try:
            wishlist_object = get_object_or_404(queryset,pk=request.user.pk)

            query_set = shops.objects.filter(Q(shop_id__in=wishlist_object.shop_wishlist.all()))
            
            serializer = shop_list_serializer(query_set,context={'request':request},many=True)

            #print(serializer.data)

            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        except:
            return Response('Error while loading wishlist',status=status.status.HTTP_200_OK)

    def create(self,request):

        #query params as room_id 

        shopid= request.query_params.get('shop_id')
        shop = get_object_or_404(shops.objects.all(),shop_id=shopid)

        #user wishlist

        #operations

        try:
            wishlist_object = wishlist.objects.get(pk=request.user.pk)
            if shop not in wishlist_object.shop_wishlist.all():
                wishlist_object.shop_wishlist.add(shop)
                wishlist_object.items=wishlist_object.items+1
                wishlist_object.save()
                shop.wishlist=shop.wishlist+1;
                shop.save()
            return Response('Added to wishlist', status=status.HTTP_202_ACCEPTED)
            
        except: 
            wishlist_object = wishlist(user_id=request.user)
            wishlist_object.save()
            if shop not in wishlist_object.shop_wishlist.all():
                wishlist_object.shop_wishlist.add(shop)
                wishlist_object.items=wishlist_object.items+1
                wishlist_object.save()
                shop.wishlist=shop.wishlist+1;
                shop.save()
            return Response('Added to wishlist', status=status.HTTP_202_ACCEPTED)

    def destroy(self,request,pk=None):

        shop = get_object_or_404(shops.objects.all(),pk=pk)

        try:
            wishlist_object = wishlist.objects.get(pk=request.user.pk)
            wishlist_object.shop_wishlist.remove(shop)
            wishlist_object.items=wishlist_object.items-1
            wishlist_object.save()
            shop.wishlist=shop.wishlist-1;
            shop.save()
            return Response('Removed from wishlist', status=status.HTTP_202_ACCEPTED)

        except:
            return Response('Error while removing from wishlist',status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request,pk=None):
    
        shop = get_object_or_404(shops.objects.all(),pk=pk)

        try:
            wishlist_object = wishlist.objects.get(pk=request.user.pk)
            if shop in wishlist_object.shop_wishlist.all():
                return Response(True, status=status.HTTP_202_ACCEPTED)
            else:
                return Response(False, status=status.HTTP_400_BAD_REQUEST)
            

        except:
            return Response(False,status=status.HTTP_400_BAD_REQUEST)

    def update(self,request,pk=None):
        try:
            wishlist_object = wishlist.objects.get(pk=request.user.pk)
            return Response(wishlist_object.items, status=status.HTTP_202_ACCEPTED)
        except:
            return Response(None,status=status.HTTP_400_BAD_REQUEST)



#apartment wishlist object


class wishlist_apartment(viewsets.ViewSet):
    
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)

    def list(self, request,format=None):
        queryset = wishlist.objects.all()
        try:
            wishlist_object = get_object_or_404(queryset,pk=request.user.pk)

            query_set = apartments.objects.filter(Q(apartment_id__in=wishlist_object.apartment_wishlist.all()))
            
            serializer = apartment_list_serializer(query_set,context={'request':request},many=True)

            #print(serializer.data)

            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        except:
            return Response('Error while loading wishlist',status=status.HTTP_400_BAD_REQUEST)

    def create(self,request):

        #query params as room_id 

        apartmentid= request.query_params.get('apartment_id')
        apartment = get_object_or_404(apartments.objects.all(),apartment_id=apartmentid)

        #user wishlist

        #operations

        try:
            wishlist_object = wishlist.objects.get(pk=request.user.pk)
            if apartment not in wishlist_object.apartment_wishlist.all():
                wishlist_object.apartment_wishlist.add(apartment)
                wishlist_object.items=wishlist_object.items+1
                wishlist_object.save()
                apartment.wishlist=apartment.wishlist+1;
                apartment.save()
            return Response('Added to wishlist', status=status.HTTP_202_ACCEPTED)
            
        except: 
            wishlist_object = wishlist(user_id=request.user)
            wishlist_object.save()
            if apartment not in wishlist_object.apartment_wishlist.all():
                wishlist_object.apartment_wishlist.add(apartment)
                wishlist_object.items=wishlist_object.items+1
                wishlist_object.save()
                apartment.wishlist=apartment.wishlist+1;
                apartment.save()
            return Response('Added to wishlist', status=status.HTTP_202_ACCEPTED)

    def destroy(self,request,pk=None):

        apartment = get_object_or_404(apartments.objects.all(),pk=pk)

        try:
            wishlist_object = wishlist.objects.get(pk=request.user.pk)
            wishlist_object.apartment_wishlist.remove(apartment)
            wishlist_object.items=wishlist_object.items-1
            wishlist_object.save()
            apartment.wishlist=apartment.wishlist-1;
            apartment.save()
            return Response('Removed from wishlist', status=status.HTTP_202_ACCEPTED)

        except:
            return Response('Error while removing from wishlist',status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request,pk=None):
    
        apartment = get_object_or_404(apartments.objects.all(),pk=pk)

        try:
            wishlist_object = wishlist.objects.get(pk=request.user.pk)
            if apartment in wishlist_object.apartment_wishlist.all():
                return Response(True, status=status.HTTP_202_ACCEPTED)
            else:
                return Response(False, status=status.HTTP_400_BAD_REQUEST)
            

        except:
            return Response(False,status=status.HTTP_400_BAD_REQUEST)

    def update(self,request,pk=None):
        try:
            wishlist_object = wishlist.objects.get(pk=request.user.pk)
            return Response(wishlist_object.items, status=status.HTTP_202_ACCEPTED)
        except:
            return Response(None,status=status.HTTP_400_BAD_REQUEST)



