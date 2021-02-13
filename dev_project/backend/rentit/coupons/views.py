from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework_simplejwt import authentication
import datetime
import json



from products.models import rooms,shops,apartments
from .models import coupons
from .serializers import coupon_serializer

# Create your views here.

class coupon_viewset(viewsets.ViewSet):

    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def list(self,request):

        try:

            queryset = coupons.objects.all()
            queryset = queryset.filter(seller_id = request.user)

            serializer = coupon_serializer(queryset,many=True)


            return Response(serializer.data,status=status.HTTP_200_OK)
        except:
            return Response('Error',status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self,request,pk=None):
    
        try:

            queryset = coupons.objects.all()
            queryset = queryset.filter(seller_id = request.user)

            coupon = get_object_or_404(queryset,pk=pk)

            serializer = coupon_serializer(coupon)

            return Response(serializer.data,status=status.HTTP_200_OK)
        except:
            return Response('Error',status=status.HTTP_400_BAD_REQUEST)

    def create(self,request):

        try:

            data = json.loads(request.body.decode('utf-8'))['data']

            if request.user.is_seller==True or request.user.is_superuser==True:

                admin = request.user.is_superuser


                




            else:
                return Response('Error',status=status.HTTP_400_BAD_REQUEST)



            return Response('success',status=status.HTTP_200_OK)
        except:
            return Response('Error',status=status.HTTP_400_BAD_REQUEST)


class Apply_coupon(viewsets.ViewSet):

    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self,request,pk=None):

        try:

            queryset = coupons.objects.all()

            coupon = get_object_or_404(queryset,pk=pk)

            price= int(request.query_params.get('price'))
            discount= int(request.query_params.get('discount'))
            savings= int(request.query_params.get('savings'))
            roomid= request.query_params.get('roomid')
            print(type(price))
    

            room = get_object_or_404(rooms.objects.all(),pk=roomid)

            if request.user not in coupon.used_by.all() and datetime.date.today()<=coupon.expiry_date and datetime.date.today()>=coupon.valid_from and room in coupon.coupoun_rooms.all():
                    
                if price>=coupon.min_price:

                    if coupon.coupon_type=='discount':
                        temp = (price*coupon.off)/100

                        if coupon.max_off_price!=None:
                            if temp>coupon.max_off_price:
                                temp=coupon.max_off_price
                        
                        price = price - temp;

                        savings = savings+temp
                        discount = discount+coupon.off

                    if coupon.coupon_type=='off_price':
                    
                        price = price - coupon.off;

                        savings = savings+coupon.off

            


                return Response({1:price,2:savings,3:discount},status=status.HTTP_200_OK)

            return Response('Error',status=status.HTTP_400_BAD_REQUEST)
            

            
        except:
            return Response('Error',status=status.HTTP_400_BAD_REQUEST)


    




            
            


