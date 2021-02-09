from __future__ import absolute_import,unicode_literals
from celery import shared_task

import celery

from products.models import rooms
from .models import roomBookings
from email1 import email_send

import datetime
import pytz

utc=pytz.UTC



@shared_task
def book_end():


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

        room.save()
    
    return 'book end done'
