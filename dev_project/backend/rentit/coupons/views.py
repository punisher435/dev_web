from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework_simplejwt import authentication
import datetime
from django.db.models import Q
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

            if request.user.is_seller and request.user.profile_completed and request.user.address_completed and request.user.bank_completed:

                data = json.loads(request.body.decode('utf-8'))['data']

                temp = int(data['max_off_price'])

                if(temp==0):
                    temp=None

                start_date = datetime.date(int(data['valid_from'][0:4]),int(data['valid_from'][5:7]),int(data['valid_from'][8:]))
                end_date = start_date + datetime.timedelta(days=int(data['life']))

                coupon = coupons(coupoun_code=data['coupoun_code'],seller_id=request.user,valid_from=start_date,expiry_date=end_date,
                life=int(data['life']),coupon_type=data['coupon_type'],off=int(data['off']),min_price=int(data['min_price']),max_off_price=temp)
                
                coupon.save()

                queryset = coupons.objects.all()
                queryset = queryset.filter(seller_id = request.user)

                coupon = get_object_or_404(queryset,pk=data['coupoun_code'])

                queryset = rooms.objects.all()
                queryset = queryset.filter(seller_id = request.user)

                for room in data['coupoun_rooms']:

                    room1 = get_object_or_404(queryset,pk=room)

                    coupon.coupoun_rooms.add(room1)

                queryset = shops.objects.all()
                queryset = queryset.filter(seller_id = request.user)

                for room in data['coupoun_shops']:

                    room1 = get_object_or_404(queryset,pk=room)

                    coupon.coupoun_shops.add(room1)
                
                queryset = apartments.objects.all()
                queryset = queryset.filter(seller_id = request.user)

                for room in data['coupoun_apartments']:

                    room1 = get_object_or_404(queryset,pk=room)

                    coupon.coupoun_apartments.add(room1)
                
                coupon.save()

                return Response('Success',status=status.HTTP_201_CREATED)
            else:
                return Response('Error',status=status.HTTP_400_BAD_REQUEST)

        except:
            return Response('Error',status=status.HTTP_400_BAD_REQUEST)

    def destroy(self,request,pk=None):

        try:

            queryset = coupons.objects.all()
            queryset = queryset.filter(seller_id = request.user)

            coupon = get_object_or_404(queryset,pk=pk)

            coupon.delete()

            return Response('Success',status=status.HTTP_200_OK)

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




class Apply_coupon_shop(viewsets.ViewSet):

    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self,request,pk=None):

        try:

            queryset = coupons.objects.all()

            coupon = get_object_or_404(queryset,pk=pk)

            price= int(request.query_params.get('price'))
            discount= int(request.query_params.get('discount'))
            savings= int(request.query_params.get('savings'))
            shopid= request.query_params.get('shopid')
            print(type(price))
    

            room = get_object_or_404(shops.objects.all(),pk=shopid)

            if request.user not in coupon.used_by.all() and datetime.date.today()<=coupon.expiry_date and datetime.date.today()>=coupon.valid_from and room in coupon.coupoun_shops.all():
                    
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



class Apply_coupon_apartment(viewsets.ViewSet):

    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self,request,pk=None):

        try:

            queryset = coupons.objects.all()

            coupon = get_object_or_404(queryset,pk=pk)

            price= int(request.query_params.get('price'))
            discount= int(request.query_params.get('discount'))
            savings= int(request.query_params.get('savings'))
            apartmentid= request.query_params.get('apartmentid')
            print(type(price))
    

            room = get_object_or_404(apartments.objects.all(),pk=apartmentid)

            if request.user not in coupon.used_by.all() and datetime.date.today()<=coupon.expiry_date and datetime.date.today()>=coupon.valid_from and room in coupon.coupoun_apartments.all():
                    
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



class Coupon_give(viewsets.ViewSet):

    def list(self,request):
        roomid = request.query_params.get('roomid')
        type1 = request.query_params.get('type')

        

        
       

        if type1 == 'room':

            try:

                queryset1 = rooms.objects.all()
                room = get_object_or_404(queryset1,pk=roomid)

                queryset = coupons.objects.all()
                list1=[]
                print('yooooo')
                for coupon in queryset:
                    if room in coupon.coupoun_rooms.all() and datetime.date.today()<=coupon.expiry_date:
                        list1.append(coupon)
       


                serializer = coupon_serializer(list1,many=True)


                return Response(serializer.data,status=status.HTTP_200_OK)
            except:
                return Response('Error',status=status.HTTP_400_BAD_REQUEST)

        if type1 == 'shop':
    
            try:

                queryset1 = shops.objects.all()
                room = get_object_or_404(queryset1,pk=roomid)

                queryset = coupons.objects.all()
                list1=[]
                print('yooooo')
                for coupon in queryset:
                    if room in coupon.coupoun_shops.all() and datetime.date.today()<=coupon.expiry_date:
                        list1.append(coupon)
            


                serializer = coupon_serializer(list1,many=True)


                return Response(serializer.data,status=status.HTTP_200_OK)
            except:
                return Response('Error',status=status.HTTP_400_BAD_REQUEST)

        if type1 == 'apartment':
        
            try:

                queryset1 = apartments.objects.all()
                room = get_object_or_404(queryset1,pk=roomid)

                queryset = coupons.objects.all()
                list1=[]
                print('yooooo')
                for coupon in queryset:
                    if room in coupon.coupoun_apartments.all() and datetime.date.today()<=coupon.expiry_date:
                        list1.append(coupon)
            


                serializer = coupon_serializer(list1,many=True)


                return Response(serializer.data,status=status.HTTP_200_OK)
            except:
                return Response('Error',status=status.HTTP_400_BAD_REQUEST)
            

    




            
            


