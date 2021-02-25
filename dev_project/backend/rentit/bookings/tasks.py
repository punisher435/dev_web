from __future__ import absolute_import,unicode_literals
from celery import shared_task

import celery

from products.models import rooms,shops,apartments
from .models import roomBookings,shopBookings,apartmentBookings
from email1 import email_send

import datetime
import pytz

utc=pytz.UTC



@shared_task
def book_end():

    try:


        queryset = roomBookings.objects.all()
        queryset = queryset.filter(ended = False)
        
        for booking in queryset:

            if booking.booked_till<datetime.date.today():
                booking.ended=True
                subject = 'Booking ended'
                message = 'Booking has ended.'
                email_send(subject,message,booking.customer_id,booking.seller_id)
                booking.save()

        queryset1 = rooms.objects.all()

        for room in queryset1:

            queryset = roomBookings.objects.all()
            queryset = queryset.filter(room_id = room)
            queryset = queryset.filter(ended = False)
            queryset = queryset.filter(cancelled = False)
            queryset = queryset.filter(extended = False)

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
        
        return 'Book end done'

    except:

        return 'Error while doing book end'





@shared_task
def fake_discount(x):

    try:

        temp=x

        queryset = rooms.objects.all()

        for room in queryset:

            price = room.seller_price

            price = price + (price*room.commission)/100
            room.final_price = price

            cost = price + (price*(room.commission+temp+room.owner_discount+room.company_discount))/100
            room.price = cost

            room.fake_discount = temp

            room.save()

        return 'Fake discount done'

    except:

        return 'Error while doing fake discount'


@shared_task
def commission(x):

    try:

        temp = x

        queryset = rooms.objects.all()

        for room in queryset:

            price = room.seller_price

            price = price + (price*temp)/100
            room.final_price = price

            cost = price + (price*(temp+room.fake_discount+room.owner_discount+room.company_discount))/100
            room.price = cost

            room.commission = temp

            room.save()

        return 'Commission done'

    except:

        return 'Error while doing commission'


@shared_task
def company_discount(x):

    try:

        temp = x

        queryset = rooms.objects.all()

        for room in queryset:

            price = room.seller_price

            price = price - (price*temp)/100

            price = price + (price*room.commission)/100
            room.final_price = price

            cost = price + (price*(room.commission+room.fake_discount+room.owner_discount+temp))/100
            room.price = cost

            room.company_discount = temp

            room.save()

        return 'Company discount done'

    except:

        return 'Error while doing company discount'




@shared_task
def book_end_shop():

    try:


        queryset = shopBookings.objects.all()
        queryset = queryset.filter(ended = False)
        
        for booking in queryset:

            if booking.booked_till<datetime.date.today():
                booking.ended=True
                subject = 'Booking ended'
                message = 'Booking has ended.'
                email_send(subject,message,booking.customer_id,booking.seller_id)
                booking.save()

        queryset1 = shops.objects.all()

        for room in queryset1:

            queryset = shopBookings.objects.all()
            queryset = queryset.filter(shop_id = room)
            queryset = queryset.filter(ended = False)
            queryset = queryset.filter(cancelled = False)
            queryset = queryset.filter(extended = False)

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
        
        return 'Book end done'

    except:

        return 'Error while doing book end'



@shared_task
def book_end_apartment():

    try:


        queryset = apartmentBookings.objects.all()
        queryset = queryset.filter(ended = False)
        
        for booking in queryset:

            if booking.booked_till<datetime.date.today():
                booking.ended=True
                subject = 'Booking ended'
                message = 'Booking has ended.'
                email_send(subject,message,booking.customer_id,booking.seller_id)
                booking.save()

        queryset1 = apartments.objects.all()

        for room in queryset1:

            queryset = apartmentBookings.objects.all()
            queryset = queryset.filter(apartment_id = room)
            queryset = queryset.filter(ended = False)
            queryset = queryset.filter(cancelled = False)
            queryset = queryset.filter(extended = False)

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
        
        return 'Book end done'

    except:

        return 'Error while doing book end'

    
