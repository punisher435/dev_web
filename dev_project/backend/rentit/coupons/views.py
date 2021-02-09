from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework_simplejwt import authentication
import datetime



from products.models import rooms,shops,apartments
from .models import coupons
from .serializers import coupon_serializer

# Create your views here.

""" class coupon_viewset(viewsets.ViewSet):

    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        try:
            if request.user.is_seller :
                print('hy')
                queryset = coupons.objects.all()
                queryset = queryset.filter(seller_id=request.user)

                serializer = coupon_serializer(queryset,many=True)

                return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
            else:
                return Response('ERROR',status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response('ERROR',status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self,request,pk=None):

        try:
            if request.user.is_seller:
                queryset = coupons.objects.all()
                queryset = queryset.filter(seller_id=request.user)

                queryset = get_object_or_404(queryset,pk=pk)

                serializer = coupon_serializer(queryset)
                return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

            return Response('ERROR',status=status.HTTP_400_BAD_REQUEST)

        except:
            return Response('No such coupon Found',status=status.HTTP_400_BAD_REQUEST)
    
    def create(self,request):
        serializer = coupon_serializer(data=request.data,partial=True)
        if serializer.is_valid(raise_exception=True):
                    serializer.validated_data["seller_id"]=request.user
                    
                    serializer.save()

                    
                    

                    return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

        try:
            if request.user.is_seller or request.user.is_superuser:
                print('hy')
                serializer = coupon_serializer(data=request.data)
                print('hy')
                
                if serializer.is_valid(raise_exception=True,partial=True):
                    serializer.validated_data["seller_id"]=request.user
                    serializer.save()

                    
                    return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
                
            return Response('Error',status=status.HTTP_400_BAD_REQUEST)

        except:
            return Response('Invalid action',status=status.HTTP_400_BAD_REQUEST)

    def update(self,request,pk=None):

        try:
            if request.user.is_seller:
                shop_id = request.query_params.get('shop_id')
                apartment_id = request.query_params.get('apartment_id')
                room_id = request.query_params.get('room_id')
                method = request.query_params.get('method')

                queryset = coupons.objects.all()
                queryset = queryset.filter(seller_id=request.user)

                coupon = get_object_or_404(queryset,pk=pk)

                if method == 'delete':
                    
                    if shop_id:

                        shop= get_object_or_404(shops.objects.all(),pk=shop_id)

                        coupon.coupon_shops.remove(shop)

                        coupon.save()

                    if room_id:
    
                        room= get_object_or_404(rooms.objects.all(),pk=room_id)

                        coupon.coupon_rooms.remove(room)

                        coupon.save()

                    if apartment_id:
    
                        apartment= get_object_or_404(apartments.objects.all(),pk=apartment_id)

                        coupon.coupon_apartments.remove(apartment)

                        coupon.save()

                    return Response('Removed',status=status.HTTP_202_ACCEPTED)

                if method == 'add':
                    
                    if shop_id:

                        shop= get_object_or_404(shops.objects.all(),pk=shop_id)

                        coupon.coupon_shops.add(shop)

                        coupon.save()

                    if room_id:
    
                        room= get_object_or_404(rooms.objects.all(),pk=room_id)

                        coupon.coupon_rooms.add(room)

                        coupon.save()

                    if apartment_id:
    
                        apartment= get_object_or_404(apartments.objects.all(),pk=apartment_id)

                        coupon.coupon_apartments.add(apartment)

                        coupon.save()

                    return Response('Added',status=status.HTTP_202_ACCEPTED)

    def destroy(self,request,pk=None):
        try:
            if request.user.is_seller:
                queryset = coupons.objects.all()
                queryset = queryset.filter(seller_id=request.user)

                queryset = get_object_or_404(queryset,pk=pk)
                queryset.delete()
                return Response('Deleted',status=status.HTTP_200_OK)
            return Response('ERROR',status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response('ERROR',status=status.HTTP_400_BAD_REQUEST)





            
            except:
            return Response('ERROR',status=status.HTTP_400_BAD_REQUEST)

    def destroy(self,request,pk=None):
        try:
            if request.user.is_seller:
                queryset = coupons.objects.all()
                queryset = queryset.filter(seller_id=request.user)

                queryset = get_object_or_404(queryset,pk=pk)
                queryset.delete()
                return Response('Deleted',status=status.HTTP_200_OK)
            return Response('ERROR',status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response('ERROR',status=status.HTTP_400_BAD_REQUEST)




 """
            
            


