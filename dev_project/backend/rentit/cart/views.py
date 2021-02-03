from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework_simplejwt import authentication
from rest_framework.parsers import MultiPartParser,FormParser
from django.db.models import Q

# Create your views here.

from products.models import rooms,shops,apartments
from products.api.serializers import room_list_serializer
from products.api.serializers import shop_list_serializer
from products.api.serializers import apartment_list_serializer
from .models import cart



class cart_room(viewsets.ViewSet):

    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)

    def list(self, request,format=None):
        queryset = cart.objects.all()
        try:
            cart_object = get_object_or_404(queryset,pk=request.user.pk)

            query_set = rooms.objects.filter(Q(room_id__in=cart_object.room_cart.all()))
            
            serializer = room_list_serializer(query_set,context={'request':request},many=True)

            #print(serializer.data)

            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        except:
            return Response('Error while loading cart',status=status.HTTP_400_BAD_REQUEST)

    def create(self,request):

        #query params as room_id 

        roomid= request.query_params.get('room_id')
        room = get_object_or_404(rooms.objects.all(),room_id=roomid)

        #user cart

        #operations

        try:
            cart_object = cart.objects.get(pk=request.user.pk)
            cart_object.room_cart.add(room)
            cart_object.items=cart_object.items+1
            cart_object.save()
            room.cart=room.cart+1;
            room.save()
            return Response('Added to cart', status=status.HTTP_202_ACCEPTED)
            
        except: 
            cart_object = cart(user_id=request.user)
            cart_object.save()
            cart_object.room_cart.add(room)
            cart_object.items=cart_object.items+1
            cart_object.save()
            room.cart=room.cart+1;
            room.save()
            return Response('Added to cart', status=status.HTTP_202_ACCEPTED)

    def destroy(self,request,pk=None):

        room = get_object_or_404(rooms.objects.all(),pk=pk)

        try:
            cart_object = cart.objects.get(pk=request.user.pk)
            cart_object.room_cart.remove(room)
            cart_object.items=cart_object.items-1
            cart_object.save()
            room.cart=room.cart-1;
            room.save()
            return Response('Removed from cart', status=status.HTTP_202_ACCEPTED)

        except:
            return Response('Error while removing from cart',status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request,pk=None):

        room = get_object_or_404(rooms.objects.all(),pk=pk)

        try:
            cart_object = cart.objects.get(pk=request.user.pk)
            if room in cart_object.room_cart.all():
                return Response(True, status=status.HTTP_202_ACCEPTED)
            else:
                return Response(False, status=status.HTTP_400_BAD_REQUEST)
            

        except:
            return Response(False,status=status.HTTP_400_BAD_REQUEST)

    def update(self,request,pk=None):
        try:
            cart_object = cart.objects.get(pk=request.user.pk)
            return Response(cart_object.items, status=status.HTTP_202_ACCEPTED)
        except:
            return Response(None,status=status.HTTP_400_BAD_REQUEST)




#shop cart object


class cart_shop(viewsets.ViewSet):
    
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)

    def list(self, request,format=None):
        queryset = cart.objects.all()
        try:
            cart_object = get_object_or_404(queryset,pk=request.user.pk)

            query_set = shops.objects.filter(Q(shop_id__in=cart_object.shop_cart.all()))
            
            serializer = shop_list_serializer(query_set,context={'request':request},many=True)

            #print(serializer.data)

            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        except:
            return Response('Error while loading cart',status=status.HTTP_400_BAD_REQUEST)

    def create(self,request):

        #query params as room_id 

        shopid= request.query_params.get('shop_id')
        shop = get_object_or_404(shops.objects.all(),shop_id=shopid)

        #user cart

        #operations

        try:
            cart_object = cart.objects.get(pk=request.user.pk)
            cart_object.shop_cart.add(shop)
            cart_object.items=cart_object.items+1
            cart_object.save()
            shop.cart=shop.cart+1;
            shop.save()
            return Response('Added to cart', status=status.HTTP_202_ACCEPTED)
            
        except: 
            cart_object = cart(user_id=request.user)
            cart_object.save()
            cart_object.shop_cart.add(shop)
            cart_object.items=cart_object.items+1
            cart_object.save()
            shop.cart=shop.cart+1;
            shop.save()
            return Response('Added to cart', status=status.HTTP_202_ACCEPTED)

    def destroy(self,request,pk=None):

        shop = get_object_or_404(shops.objects.all(),pk=pk)

        try:
            cart_object = cart.objects.get(pk=request.user.pk)
            cart_object.shop_cart.remove(shop)
            cart_object.items=cart_object.items-1
            cart_object.save()
            shop.cart=shop.cart-1;
            shop.save()
            return Response('Removed from cart', status=status.HTTP_202_ACCEPTED)

        except:
            return Response('Error while removing from cart',status=status.HTTP_400_BAD_REQUEST)

    def update(self, request,pk=None):

        shop = get_object_or_404(shops.objects.all(),pk=pk)

        cart_object = cart.objects.get(pk=request.user.pk)

        try:
            cart_object = cart.objects.get(pk=request.user.pk)
            if shop in cart_object.shop_cart.all():
                return Response(True, status=status.HTTP_202_ACCEPTED)
            else:
                return Response(False, status=status.HTTP_202_ACCEPTED)
            

        except:
            return Response(False, status=status.HTTP_202_ACCEPTED)




#apartment cart object


class cart_apartment(viewsets.ViewSet):
    
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)

    def list(self, request,format=None):
        queryset = cart.objects.all()
        try:
            cart_object = get_object_or_404(queryset,pk=request.user.pk)

            query_set = apartments.objects.filter(Q(apartment_id__in=cart_object.apartment_cart.all()))
            
            serializer = apartment_list_serializer(query_set,context={'request':request},many=True)

            #print(serializer.data)

            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        except:
            return Response('Error while loading cart',status=status.HTTP_400_BAD_REQUEST)

    def create(self,request):

        #query params as room_id 

        apartmentid= request.query_params.get('apartment_id')
        apartment = get_object_or_404(apartments.objects.all(),apartment_id=apartmentid)

        #user cart

        #operations

        try:
            cart_object = cart.objects.get(pk=request.user.pk)
            cart_object.apartment_cart.add(apartment)
            cart_object.items=cart_object.items+1
            cart_object.save()
            apartment.cart=apartment.cart+1;
            apartment.save()
            return Response('Added to cart', status=status.HTTP_202_ACCEPTED)
            
        except: 
            cart_object = cart(user_id=request.user)
            cart_object.save()
            cart_object.apartment_cart.add(apartment)
            cart_object.items=cart_object.items+1
            cart_object.save()
            apartment.cart=apartment.cart+1;
            apartment.save()
            return Response('Added to cart', status=status.HTTP_202_ACCEPTED)

    def destroy(self,request,pk=None):

        apartment = get_object_or_404(apartments.objects.all(),pk=pk)

        try:
            cart_object = cart.objects.get(pk=request.user.pk)
            cart_object.apartment_cart.remove(apartment)
            cart_object.items=cart_object.items-1
            cart_object.save()
            apartment.cart=apartment.cart-1;
            apartment.save()
            return Response('Removed from cart', status=status.HTTP_202_ACCEPTED)

        except:
            return Response('Error while removing from cart',status=status.HTTP_400_BAD_REQUEST)

    def update(self, request,pk=None):

        apartment = get_object_or_404(apartments.objects.all(),pk=pk)

        cart_object = cart.objects.get(pk=request.user.pk)

        try:
            cart_object = cart.objects.get(pk=request.user.pk)
            if apartment in cart_object.apartment_cart.all():
                return Response(True, status=status.HTTP_202_ACCEPTED)
            else:
                return Response(False, status=status.HTTP_400_BAD_REQUEST)
            

        except:
            return Response(False,status=status.HTTP_400_BAD_REQUEST)



