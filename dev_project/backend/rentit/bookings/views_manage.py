import datetime
from dateutil.relativedelta import relativedelta
import json
import pytz

from rest_framework import viewsets
from django.shortcuts import render
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
from django.views.decorators.csrf import csrf_exempt

from .models import roomBookings,shopBookings,apartmentBookings
from .serializers import roomBookingsSerializer,shopBookingsSerializer,apartmentBookingsSerializer

from products.models import rooms,shops,apartments
from coupons.models import coupons
from rentit.settings import EMAIL_HOST_USER
import celery
from email1 import email_send
from user. models import seller_bank_details

from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator


from django.template import Context
from django.template.loader import render_to_string, get_template
from django.core.mail import EmailMessage

utc=pytz.UTC

import environ

from rentit.settings import PAYTM_MERCHANT_ID
from rentit.settings import PAYTM_WEBSITE
from rentit.settings import PAYTM_CHANNEL_ID
from rentit.settings import PAYTM_INDUSTRY_TYPE_ID
from rentit.settings import PAYTM_SECRET_KEY
from . import Checksum 


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

   

    @csrf_exempt
    def create(self,request):

        checksum = ""
        # the request.POST is coming from paytm
        form = request.POST

        response_dict = {}
        order = None  # initialize the order varible with None

        for i in form.keys():
            response_dict[i] = form[i]
            if i == 'CHECKSUMHASH':
                # 'CHECKSUMHASH' is coming from paytm and we will assign it to checksum variable to verify our paymant
                checksum = form[i]

            if i == 'ORDERID':
                queryset = roomBookings.objects.all()
                
                order = queryset.get(booking_id = form[i])
                # we will get an order with id==ORDERID to turn isPaid=True when payment is successful
            

        # we will verify the payment using our merchant key and the checksum that we are getting from Paytm request.POST
        verify = Checksum.verify_checksum(response_dict, PAYTM_SECRET_KEY, checksum)

        if verify:
            if response_dict['RESPCODE'] == '01':
                # if the response code is 01 that means our transaction is successfull
                print('order successful')
                # after successfull payment we will make isPaid=True and will save the order
                order.paid = True
                order.save()
                # we will render a template to display the payment status
                
            else:
                print('order was not successful because' + response_dict['RESPMSG'])
                return render(request, 'paymentstatus.html', {'response': response_dict})


        room = get_object_or_404(rooms.objects.all(),pk=order.room_id.room_id)
        booking=order

        #payment success 


        if booking.coupon!='None':
            queryse_t = coupons.objects.all()
            coupon = get_object_or_404(queryse_t,pk=booking.coupon)
            coupon.used_by.add(request.user)
            coupon.save()


        if booking.is_extended:
            old_booking=booking.extended_on
            old_booking.extended=True
            old_booking.save()

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

        

        ctx = {
        'user': booking.customer_id.first_name+" "+booking.customer_id.last_name,
        'id':booking.booking_id,
        'start':booking.booked_from,
        'end':booking.booked_till,
        'duration':booking.duration,
        'name':booking.room_name,
        'capacity':booking.capacity,
        'money':booking.price_to_be_paid,
        'currency':booking.currency,
        }
        message = get_template('bookingconf.html').render(ctx)
        msg = EmailMessage(
            'Booking Confirmation',
            message,
            EMAIL_HOST_USER,
            [booking.customer_id.email],
        )
        msg.content_subtype = "html"  # Main content is now text/html
        msg.send()

        ctx = {
        'user': booking.seller_id.first_name+' '+booking.seller_id.last_name,
     
        'id':booking.booking_id,
        'start':booking.booked_from,
        'end':booking.booked_till,
        'duration':booking.duration,
        'name':booking.room_name,
        'capacity':booking.capacity,
        'money':booking.seller_pay,
        'currency':booking.currency,
        }
        message = get_template('bookingsell.html').render(ctx)
        msg = EmailMessage(
            'Booking Confirmation',
            message,
            EMAIL_HOST_USER,
            [room.seller_id],
        )
        msg.content_subtype = "html"  # Main content is now text/html
        msg.send()


        room.save()

        

        return render(request, 'paymentstatus.html', {'response': response_dict})



class shop_payment(viewsets.ViewSet):

  


    @csrf_exempt
    def create(self,request):
    
        checksum = ""
        # the request.POST is coming from paytm
        form = request.POST

        response_dict = {}
        order = None  # initialize the order varible with None

        for i in form.keys():
            response_dict[i] = form[i]
            if i == 'CHECKSUMHASH':
                # 'CHECKSUMHASH' is coming from paytm and we will assign it to checksum variable to verify our paymant
                checksum = form[i]

            if i == 'ORDERID':
                queryset = shopBookings.objects.all()
                
                order = queryset.get(booking_id = form[i])
                # we will get an order with id==ORDERID to turn isPaid=True when payment is successful
            

        # we will verify the payment using our merchant key and the checksum that we are getting from Paytm request.POST
        verify = Checksum.verify_checksum(response_dict, PAYTM_SECRET_KEY, checksum)

        if verify:
            if response_dict['RESPCODE'] == '01':
                # if the response code is 01 that means our transaction is successfull
                print('order successful')
                # after successfull payment we will make isPaid=True and will save the order
                order.paid = True
                order.save()
                # we will render a template to display the payment status
                
            else:
                print('order was not successful because' + response_dict['RESPMSG'])
                return render(request, 'paymentstatus.html', {'response': response_dict})


        room = get_object_or_404(shops.objects.all(),pk=order.shop_id.shop_id)
        booking=order

        
        #payment success 

        if booking.coupon!='None':
            queryse_t = coupons.objects.all()
            coupon = get_object_or_404(queryse_t,pk=booking.coupon)
            coupon.used_by.add(request.user)
            coupon.save()

        if booking.is_extended:
            old_booking=booking.extended_on
            old_booking.extended=True
            old_booking.save()
        
        seller_pay = booking.seller_pay

        seller = get_object_or_404(seller_bank_details.objects.all(),pk=room.seller_id)

        seller_pay = seller_pay - (seller_pay*seller.commission/100)

        seller.total_due_payment = seller.total_due_payment+seller_pay

        seller.save()

        room.trust_points = room.trust_points + (10*booking.duration)

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

        ctx = {
        'user': booking.customer_id.first_name+" "+booking.customer_id.last_name,
        'id':booking.booking_id,
        'start':booking.booked_from,
        'end':booking.booked_till,
        'duration':booking.duration,
        'name':booking.shop_name,
        
        'money':booking.price_to_be_paid,
        'currency':booking.currency,
        }
        message = get_template('bookingconf1.html').render(ctx)
        msg = EmailMessage(
            'Booking Confirmation',
            message,
            EMAIL_HOST_USER,
            [booking.customer_id.email],
        )
        msg.content_subtype = "html"  # Main content is now text/html
        msg.send()

        ctx = {
        'user': booking.seller_id.first_name+' '+booking.seller_id.last_name,
        'id':booking.booking_id,
        'start':booking.booked_from,
        'end':booking.booked_till,
        'duration':booking.duration,
        'name':booking.shop_name,
        
        'money':booking.seller_pay,
        'currency':booking.currency,
        }
        message = get_template('bookingsell1.html').render(ctx)
        msg = EmailMessage(
            'Booking Confirmation',
            message,
            EMAIL_HOST_USER,
            [room.seller_id],
        )
        msg.content_subtype = "html"  # Main content is now text/html
        msg.send()

        room.save()

        return render(request, 'paymentstatus.html', {'response': response_dict})






class apartment_payment(viewsets.ViewSet):

   

    @csrf_exempt
    def create(self,request):
    
        checksum = ""
        # the request.POST is coming from paytm
        form = request.POST

        response_dict = {}
        order = None  # initialize the order varible with None

        for i in form.keys():
            response_dict[i] = form[i]
            if i == 'CHECKSUMHASH':
                # 'CHECKSUMHASH' is coming from paytm and we will assign it to checksum variable to verify our paymant
                checksum = form[i]

            if i == 'ORDERID':
                queryset = apartmentBookings.objects.all()
                
                order = queryset.get(booking_id = form[i])
                # we will get an order with id==ORDERID to turn isPaid=True when payment is successful
            

        # we will verify the payment using our merchant key and the checksum that we are getting from Paytm request.POST
        verify = Checksum.verify_checksum(response_dict, PAYTM_SECRET_KEY, checksum)

        if verify:
            if response_dict['RESPCODE'] == '01':
                # if the response code is 01 that means our transaction is successfull
                print('order successful')
                # after successfull payment we will make isPaid=True and will save the order
                order.paid = True
                order.save()
                # we will render a template to display the payment status
                
            else:
                print('order was not successful because' + response_dict['RESPMSG'])
                return render(request, 'paymentstatus.html', {'response': response_dict})


        room = get_object_or_404(apartments.objects.all(),pk=order.apartment_id.apartment_id)
        booking=order

        
        #payment success 

        if booking.coupon!='None':
            queryse_t = coupons.objects.all()
            coupon = get_object_or_404(queryse_t,pk=booking.coupon)
            coupon.used_by.add(request.user)
            coupon.save()

        if booking.is_extended:
            old_booking=booking.extended_on
            old_booking.extended=True
            old_booking.save()

        seller_pay = booking.seller_pay

        seller = get_object_or_404(seller_bank_details.objects.all(),pk=room.seller_id)

        seller_pay = seller_pay - (seller_pay*seller.commission/100)

        seller.total_due_payment = seller.total_due_payment+seller_pay

        seller.save()

        room.trust_points = room.trust_points + (10*booking.duration)

        booking.save()

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

        ctx = {
       'user': booking.customer_id.first_name+" "+booking.customer_id.last_name,
        'id':booking.booking_id,
        'start':booking.booked_from,
        'end':booking.booked_till,
        'duration':booking.duration,
        'name':booking.apartment_name,
        
        'money':booking.price_to_be_paid,
        'currency':booking.currency,
        }
        message = get_template('bookingconf1.html').render(ctx)
        msg = EmailMessage(
            'Booking Confirmation',
            message,
            EMAIL_HOST_USER,
            [booking.customer_id.email],
        )
        msg.content_subtype = "html"  # Main content is now text/html
        msg.send()

        ctx = {
        'user': booking.seller_id.first_name+' '+booking.seller_id.last_name,
        'id':booking.booking_id,
        'start':booking.booked_from,
        'end':booking.booked_till,
        'duration':booking.duration,
        'name':booking.apartment_name,
        
        'money':booking.seller_pay,
        'currency':booking.currency,
        }
        message = get_template('bookingsell1.html').render(ctx)
        msg = EmailMessage(
            'Booking Confirmation',
            message,
            EMAIL_HOST_USER,
            [room.seller_id],
        )
        msg.content_subtype = "html"  # Main content is now text/html
        msg.send()


        room.save()

        return render(request, 'paymentstatus.html', {'response': response_dict})




