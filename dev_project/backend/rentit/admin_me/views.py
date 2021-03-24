from django.shortcuts import render

import datetime
from dateutil.relativedelta import relativedelta
import json
import pytz

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

from bookings.models import roomBookings,shopBookings,apartmentBookings
from bookings.serializers import roomBookingsSerializer,shopBookingsSerializer,apartmentBookingsSerializer

from products.models import rooms,shops,apartments
from coupons.models import coupons

from email1 import email_send
from user.models import seller_bank_details

from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator
from products.api.serializers import room_list_serializer,room_detail_serializer
from products.api.serializers import shop_list_serializer,shop_detail_serializer
from products.api.serializers import apartment_list_serializer,apartment_detail_serializer

utc=pytz.UTC



# Create your views here.

class admin_booking(viewsets.ViewSet):

    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self,request,pk=None):
    
        try:

            if request.user.is_superuser:

                booking_type= request.query_params.get('type')

                if booking_type=='room':

                    queryset = roomBookings.objects.all()
                    booking = get_object_or_404(queryset,pk=pk)

                    serializer = roomBookingsSerializer(booking,context={'request':request})
                    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

                elif booking_type=='shop':
        
                    queryset = shopBookings.objects.all()
                    booking = get_object_or_404(queryset,pk=pk)

                    serializer = shopBookingsSerializer(booking,context={'request':request})
                    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

                elif booking_type=='apartment':
            
                    queryset = apartmentBookings.objects.all()
                    booking = get_object_or_404(queryset,pk=pk)

                    serializer = apartmentBookingsSerializer(booking,context={'request':request})
                    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            else:
                return Response('',status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response('',status=status.HTTP_400_BAD_REQUEST)

    def update(self,request,pk=None):

        try:

            if request.user.is_superuser:

                booking_type= request.query_params.get('type')

                if booking_type=='room':

                    queryset = roomBookings.objects.all()
                    booking = get_object_or_404(queryset,pk=pk)
                    

                    booking.cancelled=True

                    room = get_object_or_404(rooms.objects.all(),pk=booking.room_id.room_id)

                    if booking.is_extended==True:

                        old_booking = get_object_or_404(roomBookings.objects.all(),pk=booking.extended_on.booking_id)
                        old_booking.extended = False
                        old_booking.save()


                    print('new')
                    room.trust_points = room.trust_points - 10*int(booking.duration)
                    

                    refund_price = 0

                    if utc.localize(datetime.datetime.now())<=booking.created_at+datetime.timedelta(days=5):
                        print('refunded')
                        refund_price = booking.price_to_be_paid

                        seller_pay = booking.seller_pay
                        seller = get_object_or_404(seller_bank_details.objects.all(),pk=room.seller_id)
                        seller.total_due_payment = seller.total_due_payment-seller_pay
                        seller.save()

                    elif utc.localize(datetime.datetime.now())<=booking.created_at+datetime.timedelta(days=7) and utc.localize(datetime.datetime.now())>booking.created_at+datetime.timedelta(days=5):
                        refund_price = int(booking.price_to_be_paid/2)

                        seller_pay = booking.seller_pay/2
                        seller = get_object_or_404(seller_bank_details.objects.all(),pk=room.seller_id)
                        seller.total_due_payment = seller.total_due_payment-seller_pay
                        seller.save()

                    booking.refund_amount = refund_price
                    booking.cancelled_date = datetime.datetime.now()

                    subject = 'Booking cancelled'
                    message = 'Booking has been successfull cancelled.'
                    email_send(subject,message,request.user,room.seller_id)
                    booking.save()

                    
                    queryset = roomBookings.objects.all()
                    queryset = queryset.filter(room_id = room)
                    queryset = queryset.filter(ended = False)
                    queryset = queryset.filter(cancelled = False)
                    queryset = queryset.filter(paid = True)
                    queryset = queryset.filter(extended=False)

                    list1=[]

                    for data1 in queryset:
                        a=0
                        while a<data1.capacity:
                            list1.append(data1.booked_till)
                            a=a+1


                    temp = len(list1)

                    if temp<room.capacity:
                        list1.sort()
                        room.booked_by=temp
                        while temp<=10:
                            list1.append(None)
                            temp=temp+1
                        room.booked=False
                        room.bookedtill=datetime.date(2000,1,1)
                        room.book1=list1[0]
                        room.book2=list1[1]
                        room.book3=list1[2]
                        room.book4=list1[3]
                        room.book5=list1[4]
                        room.book6=list1[5]
                        room.book7=list1[6]
                        room.book8=list1[7]
                        room.book9=list1[8]
                        room.book10=list1[9]

                    elif temp>=room.capacity:
                        if temp>10:

                            list1.sort(reverse=True)
            
                            room.booked_by=room.capacity
                            room.bookedtill=list1[9]
                            room.booked=True

                            room.book1=list1[9]
                            room.book2=list1[8]
                            room.book3=list1[7]
                            room.book4=list1[6]
                            room.book5=list1[5]
                            room.book6=list1[4]
                            room.book7=list1[3]
                            room.book8=list1[2]
                            room.book9=list1[1]
                            room.book10=list1[0]


                        else:

                            list1.sort()
                            while temp<=10:
                                list1.append(None)
                                temp=temp+1
                            room.booked_by=room.capacity
                            room.bookedtill=list1[0]
                            room.booked=True

                            room.book1=list1[0]
                            room.book2=list1[1]
                            room.book3=list1[2]
                            room.book4=list1[3]
                            room.book5=list1[4]
                            room.book6=list1[5]
                            room.book7=list1[6]
                            room.book8=list1[7]
                            room.book9=list1[8]
                            room.book10=list1[9]

                    room.save()

                    return Response('cancelled',status = status.HTTP_202_ACCEPTED)
                    

                elif booking_type=='shop':
        
                    queryset = shopBookings.objects.all()
                    booking = get_object_or_404(queryset,pk=pk)

                    booking.cancelled=True

                    room = get_object_or_404(shops.objects.all(),pk=booking.shop_id.shop_id)

                    if booking.is_extended==True:

                        old_booking = get_object_or_404(shopBookings.objects.all(),pk=booking.extended_on.booking_id)
                        old_booking.extended = False
                        old_booking.save()


                    print('new')
                    room.trust_points = room.trust_points - 10*int(booking.duration)
                    

                    refund_price = 0

                    if utc.localize(datetime.datetime.now())<=booking.created_at+datetime.timedelta(days=5):
                        print('refunded')
                        refund_price = booking.price_to_be_paid

                        seller_pay = booking.seller_pay
                        seller = get_object_or_404(seller_bank_details.objects.all(),pk=room.seller_id)
                        seller.total_due_payment = seller.total_due_payment-seller_pay
                        seller.save()

                    elif utc.localize(datetime.datetime.now())<=booking.created_at+datetime.timedelta(days=7) and utc.localize(datetime.datetime.now())>booking.created_at+datetime.timedelta(days=5):
                        refund_price = int(booking.price_to_be_paid/2)

                        seller_pay = booking.seller_pay/2
                        seller = get_object_or_404(seller_bank_details.objects.all(),pk=room.seller_id)
                        seller.total_due_payment = seller.total_due_payment-seller_pay
                        seller.save()

                    booking.refund_amount = refund_price
                    booking.cancelled_date = datetime.datetime.now()

                    subject = 'Booking cancelled'
                    message = 'Booking has been successfull cancelled.'
                    email_send(subject,message,request.user,room.seller_id)
                    booking.save()

                    
                    queryset = shopBookings.objects.all()
                    queryset = queryset.filter(shop_id = room)
                    queryset = queryset.filter(ended = False)
                    queryset = queryset.filter(cancelled = False)
                    queryset = queryset.filter(paid=True)
                    queryset = queryset.filter(extended=False)

                    list1=[]

                    for data1 in queryset:
                        list1.append(data1.booked_till)
                    


                    temp = len(list1)

                    if temp==0:
                        room.booked = False
                        room.bookedtill = datetime.date(2000,1,1)
                    else:
                        list1.sort(reverse=True)
                        room.booked = True
                        room.bookedtill = list1[0]

                    room.save()

                    return Response('cancelled',status = status.HTTP_202_ACCEPTED)

                    

                elif booking_type=='apartment':
            
                    queryset = apartmentBookings.objects.all()
                    booking = get_object_or_404(queryset,pk=pk)

                    booking.cancelled=True

                    room = get_object_or_404(apartments.objects.all(),pk=booking.apartment_id.apartment_id)

                    if booking.is_extended==True:

                        old_booking = get_object_or_404(apartmentBookings.objects.all(),pk=booking.extended_on.booking_id)
                        old_booking.extended = False
                        old_booking.save()


                    print('new')
                    room.trust_points = room.trust_points - 10*int(booking.duration)
                    

                    refund_price = 0

                    if utc.localize(datetime.datetime.now())<=booking.created_at+datetime.timedelta(days=5):
                        print('refunded')
                        refund_price = booking.price_to_be_paid

                        seller_pay = booking.seller_pay
                        seller = get_object_or_404(seller_bank_details.objects.all(),pk=room.seller_id)
                        seller.total_due_payment = seller.total_due_payment-seller_pay
                        seller.save()

                    elif utc.localize(datetime.datetime.now())<=booking.created_at+datetime.timedelta(days=7) and utc.localize(datetime.datetime.now())>booking.created_at+datetime.timedelta(days=5):
                        refund_price = int(booking.price_to_be_paid/2)

                        seller_pay = booking.seller_pay/2
                        seller = get_object_or_404(seller_bank_details.objects.all(),pk=room.seller_id)
                        seller.total_due_payment = seller.total_due_payment-seller_pay
                        seller.save()

                    booking.refund_amount = refund_price
                    booking.cancelled_date = datetime.datetime.now()

                    subject = 'Booking cancelled'
                    message = 'Booking has been successfull cancelled.'
                    email_send(subject,message,request.user,room.seller_id)
                    booking.save()

                    
                    queryset = apartmentBookings.objects.all()
                    queryset = queryset.filter(apartment_id = room)
                    queryset = queryset.filter(ended = False)
                    queryset = queryset.filter(paid=True)
                    queryset = queryset.filter(cancelled = False)
                    queryset = queryset.filter(extended=False)

                    list1=[]

                    for data1 in queryset:
                        list1.append(data1.booked_till)
                    


                    temp = len(list1)

                    if temp==0:
                        room.booked = False
                        room.bookedtill = datetime.date(2000,1,1)
                    else:
                        list1.sort(reverse=True)
                        room.booked = True
                        room.bookedtill = list1[0]

                    room.save()

                    return Response('cancelled',status = status.HTTP_202_ACCEPTED)

                    
            else:
                return Response('',status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response('',status=status.HTTP_400_BAD_REQUEST)



class admin_room(viewsets.ViewSet):
    
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self,request,pk=None):
        
        try:

            if request.user.is_superuser:

                booking_type= request.query_params.get('type')

                if booking_type=='room':

                    queryset = roomBookings.objects.all()
                    queryset = queryset.filter(extended=False)
                    queryset = queryset.filter(ended=False)
                    queryset = queryset.filter(paid = True)
                    

                    serializer = roomBookingsSerializer(queryset,context={'request':request},many=True)
                    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

                elif booking_type=='shop':
        
                    queryset = shopBookings.objects.all()
                    queryset = queryset.filter(extended=False)
                    queryset = queryset.filter(ended=False)
                    queryset = queryset.filter(paid = True)

                    serializer = shopBookingsSerializer(queryset,context={'request':request},many=True)
                    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

                elif booking_type=='apartment':
            
                    queryset = apartmentBookings.objects.all()
                    queryset = queryset.filter(extended=False)
                    queryset = queryset.filter(ended=False)
                    queryset = queryset.filter(paid = True)

                    serializer = apartmentBookingsSerializer(queryset,context={'request':request},many=True)
                    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            else:
                return Response('',status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response('',status=status.HTTP_400_BAD_REQUEST)


    def update(self,request,pk=None):
        
        try:

            if request.user.is_superuser:

                booking_type= request.query_params.get('type')

                if booking_type=='room':
                    room = get_object_or_404(rooms.objects.all(),pk=pk)

                    queryset = roomBookings.objects.all()
                    queryset = queryset.filter(room_id = room)
                    queryset = queryset.filter(ended = False)
                    queryset = queryset.filter(paid = True)
                    queryset = queryset.filter(cancelled = False)
                    queryset = queryset.filter(extended=False)

                    list1=[]

                    for data1 in queryset:
                        a=0
                        while a<data1.capacity:
                            list1.append(data1.booked_till)
                            a=a+1


                    temp = len(list1)

                    if temp<room.capacity:
                        list1.sort()
                        room.booked_by=temp
                        while temp<=10:
                            list1.append(None)
                            temp=temp+1
                        room.booked=False
                        room.bookedtill=datetime.date(2000,1,1)
                        room.book1=list1[0]
                        room.book2=list1[1]
                        room.book3=list1[2]
                        room.book4=list1[3]
                        room.book5=list1[4]
                        room.book6=list1[5]
                        room.book7=list1[6]
                        room.book8=list1[7]
                        room.book9=list1[8]
                        room.book10=list1[9]

                    elif temp>=room.capacity:
                        if temp>10:

                            list1.sort(reverse=True)

                            room.booked_by=room.capacity
                            room.bookedtill=list1[9]
                            room.booked=True

                            room.book1=list1[9]
                            room.book2=list1[8]
                            room.book3=list1[7]
                            room.book4=list1[6]
                            room.book5=list1[5]
                            room.book6=list1[4]
                            room.book7=list1[3]
                            room.book8=list1[2]
                            room.book9=list1[1]
                            room.book10=list1[0]


                        else:

                            list1.sort()
                            while temp<=10:
                                list1.append(None)
                                temp=temp+1
                            room.booked_by=room.capacity
                            room.bookedtill=list1[0]
                            room.booked=True

                            room.book1=list1[0]
                            room.book2=list1[1]
                            room.book3=list1[2]
                            room.book4=list1[3]
                            room.book5=list1[4]
                            room.book6=list1[5]
                            room.book7=list1[6]
                            room.book8=list1[7]
                            room.book9=list1[8]
                            room.book10=list1[9]

                    

                    room.save()

        

                    return Response('Success',status=status.HTTP_202_ACCEPTED)
                    

                elif booking_type=='shop':
                    room = get_object_or_404(shops.objects.all(),pk=pk)

                    queryset = shopBookings.objects.all()
                    queryset = queryset.filter(shop_id = room)
                    queryset = queryset.filter(ended = False)
                    queryset = queryset.filter(cancelled = False)
                    queryset = queryset.filter(paid=True)
                    queryset = queryset.filter(extended=False)

                    list1=[]

                    for data1 in queryset:
                        list1.append(data1.booked_till)
                        


                    temp = len(list1)

                    if temp==0:
                        room.booked = False
                        room.bookedtill = datetime.date(2000,1,1)
                    else:
                        list1.sort(reverse=True)
                        room.booked = True
                        room.bookedtill = list1[0]

                    room.save()


                    return Response('Success',status=status.HTTP_202_ACCEPTED)
        
                    

                elif booking_type=='apartment':
                    room = get_object_or_404(apartments.objects.all(),pk=pk)

                    queryset = apartmentBookings.objects.all()
                    queryset = queryset.filter(apartment_id = room)
                    queryset = queryset.filter(ended = False)
                    queryset = queryset.filter(cancelled = False)
                    queryset = queryset.filter(paid=True)
                    queryset = queryset.filter(extended=False)

                    list1=[]

                    for data1 in queryset:
                        list1.append(data1.booked_till)
                        


                    temp = len(list1)

                    if temp==0:
                        room.booked = False
                        room.bookedtill = datetime.date(2000,1,1)
                    else:
                        list1.sort(reverse=True)
                        room.booked = True
                        room.bookedtill = list1[0]

                    room.save()




                    return Response('Success',status=status.HTTP_202_ACCEPTED)
            
                    
            else:
                return Response('',status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response('',status=status.HTTP_400_BAD_REQUEST)




class admin_seller(viewsets.ViewSet):
    
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self,request,pk=None):
        
        try:
            

            if request.user.is_superuser:

                booking_type= request.query_params.get('type')
                email= request.query_params.get('email')

                if booking_type=='room':

                    queryset = rooms.objects.all()
                    
                    queryset = queryset.filter(seller_id__email=email)
                    

                    serializer = room_list_serializer(queryset,context={'request':request},many=True)
                    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

                elif booking_type=='shop':
        
                    queryset = shops.objects.all()
                    
                    queryset = queryset.filter(seller_id__email=email)
                    

                    serializer = shop_list_serializer(queryset,context={'request':request},many=True)
                    return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

                elif booking_type=='apartment':
            
                    queryset = apartments.objects.all()
                    
                    queryset = queryset.filter(seller_id__email=email)
                    

                    serializer = apartment_list_serializer(queryset,context={'request':request},many=True)
            else:
                return Response('',status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response('',status=status.HTTP_400_BAD_REQUEST)



