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

from .models import roomBookings,shopBookings,apartmentBookings
from .serializers import roomBookingsSerializer,shopBookingsSerializer,apartmentBookingsSerializer

from products.models import rooms,shops,apartments
from coupons.models import coupons

import celery
from email1 import email_send
from user. models import seller_bank_details

from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator

utc=pytz.UTC

import razorpay
import environ


env = environ.Env()

environ.Env.read_env()

utc=pytz.UTC

env = environ.Env()

environ.Env.read_env()



def arrange(list1,end_date,capacity):
    list2=[]
    x=1
    for date in list1:
        if date==None and x<=capacity:
            list2.append(end_date)
            x=x+1
        elif date==None:
            list2.append(datetime.date(3000,1,1))
        else:
            list2.append(date)
    list2.sort()

    list3=[]

    for date in list2:
        if date!=datetime.date(3000,1,1):
            list3.append(date)
        else:
            list3.append(None)

    return list3

def arrange_future(list1,book_date,end_date,booked_space,capacity,bookings):
    y=0
    temp = book_date - datetime.timedelta(days=1)
    temp1 = book_date + datetime.timedelta(days=10)
    for date in list1:
        if temp>date and date<=temp1:
            y=y+1

    if(y>booked_space):
        while booked_space>0:
            list1[y-booked_space]=end_date
            booked_space=booked_space-1
    else:
        while booked_space>0:
            list1[booked_space-1]=end_date
            booked_space=booked_space-1
    
    list1.sort()

    return list1

def arrange_complex(list1,book_date,end_date,booked_space,capacity,bookings):

    x=0
    while x<10:
        if list1[x]==None:
            list1[x]=end_date
            booked_space=booked_space-1
        x=x+1

    list1.sort()

    y=0
    temp = book_date - datetime.timedelta(days=1)
    temp1 = book_date + datetime.timedelta(days=10)
    for date in list1:
        if temp>date and date<=temp1:
            y=y+1

    if(y>booked_space):
        while booked_space>0:
            list1[y-booked_space]=end_date
            booked_space=booked_space-1
    else:
        while booked_space>0:
            list1[booked_space-1]=end_date
            booked_space=booked_space-1
    
    list1.sort()

    return list1





class room_payment(viewsets.ViewSet):

    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)


    def update(self,request,pk=None):

        res = json.loads(request.data["response"])


        

        ord_id = ""
        raz_pay_id = ""
        raz_signature = ""

        for key in res.keys():
            if key == 'razorpay_order_id':
                ord_id = res[key]
            elif key == 'razorpay_payment_id':
                raz_pay_id = res[key]
            elif key == 'razorpay_signature':
                raz_signature = res[key]

        data = {
        'razorpay_order_id': ord_id,
        'razorpay_payment_id': raz_pay_id,
        'razorpay_signature': raz_signature
        }

        queryset = roomBookings.objects.all()
        queryset = queryset.filter(customer_id = request.user)
        booking = queryset.get(payment_id = ord_id)



        room = get_object_or_404(rooms.objects.all(),pk=booking.room_id.room_id)


        client = razorpay.Client(auth=("rzp_test_pZY7nsJ2sz72Or","jWnoB4EKVm7j3nAngWEx9zaE"))

        check = client.utility.verify_payment_signature(data)

        if check is not None:
            print("Redirect to error url or error page")
            return Response({'error': 'Payment failed'},status=status.HTTP_400_BAD_REQUEST)


        #payment success 
        booking.paid = True

        seller_pay = booking.seller_pay

        seller = get_object_or_404(seller_bank_details.objects.all(),pk=room.seller_id)

        seller_pay = seller_pay - (seller_pay*seller.commission/100)

        seller.total_due_payment = seller.total_due_payment+seller_pay

        seller.save()

        room.trust_points = room.trust_points + (10*booking.duration)

        booking.save()
        
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

        subject = 'Booking Confirmed'
        message = 'Booking has been successfull made.'
        email_send(subject,message,request.user,room.seller_id)

        room.save()

        

        return Response('Success',status=status.HTTP_202_ACCEPTED)



