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





def payment(amount,currency):

    client = razorpay.Client(auth=("rzp_test_pZY7nsJ2sz72Or","jWnoB4EKVm7j3nAngWEx9zaE"))

    # create razorpay order
    payment = client.order.create({"amount": int(amount) * 100, 
                                   "currency": currency, 
                                   "payment_capture": "1"})

    return payment

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



class room_booking(viewsets.ViewSet):

    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)
    


    def list(self,request):

        try:

            queryset = roomBookings.objects.all()

            if request.user.is_seller==True:
                queryset = queryset.filter(seller_id = request.user)
            else:
                queryset = queryset.filter(customer_id = request.user)

            queryset = queryset.filter(paid = True)

            serializer = roomBookingsSerializer(queryset,context={'request':request},many=True)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

        except:

            return Response('ERROR', status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self,request,pk=None):

        try:

            queryset = roomBookings.objects.all()
            if request.user.is_seller==True:
                queryset = queryset.filter(seller_id = request.user)
            else:
                queryset = queryset.filter(customer_id = request.user)

            queryset = queryset.filter(paid = True)
                
            booking = get_object_or_404(queryset,pk=pk)

            serializer = roomBookingsSerializer(booking,context={'request':request})
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

        except:

            return Response('ERROR', status=status.HTTP_400_BAD_REQUEST)

    
    def create(self,request,format=None):
        try:

        
            data = json.loads(request.body.decode('utf-8'))['data']

            if request.user.is_seller == False:

                queryset = rooms.objects.all()
                room = get_object_or_404(queryset,pk=data['roomid'])

                y = room.capacity-room.booked_by
                if y<0:
                    y=0
                book_date = datetime.date(data['year'], data['month'], data['date'])
                d1 = book_date - datetime.timedelta(days=1)
                
                if room.book1!=None:
                    if d1>room.book1:
                        y=y+1
                if room.book2!=None:
                    if d1>room.book2:
                        y=y+1
                if room.book3!=None:
                    if d1>room.book3:
                        y=y+1
                if room.book4!=None:
                    if d1>room.book4:
                        y=y+1
                if room.book5!=None:
                    if d1>room.book5:
                        y=y+1
                if room.book6!=None:
                    if d1>room.book6:
                        y=y+1
                if room.book7!=None:
                    if d1>room.book7:
                        y=y+1
                if room.book8!=None:
                    if d1>room.book8:
                        y=y+1
                if room.book9!=None:
                    if d1>room.book9:
                        y=y+1
                if room.book10!=None:
                    if d1>room.book10:
                        y=y+1

                
                

                
                


                if y>=data['capacity'] and book_date<=datetime.date.today()+datetime.timedelta(days=15) and room.pausebooking==False and room.removed==False:
                    

                    x = room.final_price
                    seller_pay = room.seller_price
                    x = x + room.cost_electricity + room.cost_water
                    seller_pay = seller_pay + room.cost_electricity + room.cost_water
                    if data['wifi']:
                        x=x+room.cost_wifi
                        seller_pay=seller_pay+room.cost_wifi
                    if data['house_TV']:
                        x=x+room.cost_TV
                        seller_pay=seller_pay+room.cost_TV
                    if data['room_TV']:
                        x=x+room.cost_roomTV
                        seller_pay=seller_pay+room.cost_roomTV
                    if data['house_refridgerator']:
                        x=x+room.cost_refridgerator
                        seller_pay=seller_pay+room.cost_refridgerator
                    if data['room_refridgerator']:
                        x=x+room.cost_roomrefridgerator
                        seller_pay=seller_pay+room.cost_roomrefridgerator
                    if data['purified_water']:
                        x=x+room.cost_purified_water
                        seller_pay=seller_pay+room.cost_purified_water
                    if data['geyser']:
                        x=x+room.cost_geyser
                        seller_pay=seller_pay+room.cost_geyser
                    if data['AC']:
                        x=x+room.cost_AC
                        seller_pay=seller_pay+room.cost_AC
                    if data['cooler']:
                        x=x+room.cost_cooler
                        seller_pay=seller_pay+room.cost_cooler
                    if data['lunch']:
                        x=x+room.cost_lunch
                        seller_pay=seller_pay+room.cost_lunch
                    if data['breakfast']:
                        x=x+room.cost_breakfast
                        seller_pay=seller_pay+room.cost_breakfast
                    if data['dinner']:
                        x=x+room.cost_dinner
                        seller_pay=seller_pay+room.cost_dinner

                    price = x*data['duration']*data['capacity']
                    seller_pay = seller_pay*data['duration']*data['capacity']

                    temp_coupon = 'None'


                    if data['coupon']!='none':

                        queryset = coupons.objects.all()
                        try:
                            coupon = get_object_or_404(queryset,pk=data['coupon'])

                            if request.user not in coupon.used_by.all() and datetime.date.today()<=coupon.expiry_date and datetime.date.today()>=coupon.valid_from and room in coupon.coupoun_rooms.all():
                                
                                if price>=coupon.min_price:

                                    if coupon.coupon_type=='discount':
                                        temp = (price*coupon.off)/100

                                        if coupon.max_off_price!=None:
                                            if temp>coupon.max_off_price:
                                                temp=coupon.max_off_price
                                        
                                        price = price - temp;
                                        if coupon.admin_coupon == False:
                                            seller_pay = seller_pay - temp;

                                        data['savings'] = data['savings']+temp
                                        data['discount'] = data['discount']+coupon.off

                                    if coupon.coupon_type=='off_price':
                                    
                                        price = price - coupon.off;
                                        if coupon.admin_coupon == False:
                                            seller_pay = seller_pay - coupon.off;

                                        data['savings'] = data['savings']+coupon.off

                                    coupon.used_by.add(request.user)
                                    temp_coupon = coupon.coupoun_code
                                    coupon.save()
                
                        except:
                            return Response('Coupon not applicable',status=status.HTTP_400_BAD_REQUEST)



                        
                    
                    

                    print('success')


                    end_date = book_date + relativedelta(months=+data['duration'])  

                    x = payment(price,room.currency[2:])


                    booking = roomBookings(room_id=room,payment_id=x['id'],coupon=temp_coupon,room_name=room.title,customer_id=request.user,seller_id=room.seller_id,
                        booked_from=book_date,booked_till=end_date,capacity=data['capacity'],duration=data['duration'],first_name=data['firstname'],last_name=data['lastname'],mobile=data['mobile'],alternate_mobile=data['alternate_mobile'],
                        country_code=data['country_code'],wifi=data['wifi'],house_TV=data['house_TV'],room_TV=data['room_TV'],house_refridgerator=data['house_refridgerator'],room_refridgerator=data['room_refridgerator'],
                        purified_water=data['purified_water'],geyser=data['geyser'],AC=data['AC'],cooler=data['cooler'],breakfast=data['breakfast'],lunch=data['lunch'],dinner=data['dinner'],currency=room.currency,
                        savings=data['savings'],seller_pay=seller_pay,cost=room.price,paid=False,price_to_be_paid=price,discount=data['discount'])
                        
                    booking.save()

                    

                    serializer = roomBookingsSerializer(booking)                       

                    return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

                    
                else:
                    print('no input2')
                    return Response('error',status=status.HTTP_400_BAD_REQUEST)
            return Response('error',status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response('error',status=status.HTTP_400_BAD_REQUEST)

            
       

    
    def destroy(self,request,pk=None):

        try:


            queryset = roomBookings.objects.all()
            queryset = queryset.filter(customer_id = request.user)
            queryset = queryset.filter(extended=False)
            queryset = queryset.filter(ended=False)
            queryset = queryset.filter(paid = True)
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
        except:
            return Response('error',status = status.HTTP_400_BAD_REQUEST)

    
    def update(self,request,pk=None):

        try:
            
            data = json.loads(request.body.decode('utf-8'))['data']
            queryset = roomBookings.objects.all()
            queryset = queryset.filter(customer_id=request.user)
            queryset = queryset.filter(extended=False)
            queryset = queryset.filter(ended=False)
            queryset = queryset.filter(paid = True)
            queryset = queryset.filter(cancelled=False)
            booking = get_object_or_404(queryset,pk=pk)
            data['roomid'] = booking.room_id.room_id

            data['firstname'] = booking.first_name 
            data['lastname'] = booking.last_name 
            data['mobile'] = booking.mobile 
            data['country_code'] = booking.country_code 
            data['alternate_mobile'] = booking.alternate_mobile 

           
                

            data['capacity'] = booking.capacity 
            if request.user.is_seller == False:

                queryset = rooms.objects.all()
                room = get_object_or_404(queryset,pk=data['roomid'])

                y = 0
                book_date = booking.booked_till + datetime.timedelta(days=1)
                d1 = book_date - datetime.timedelta(days=1)
                
                if room.book1!=None:
                    if d1>=room.book1:
                        y=y+1
                if room.book2!=None:
                    if d1>=room.book2:
                        y=y+1
                if room.book3!=None:
                    if d1>=room.book3:
                        y=y+1
                if room.book4!=None:
                    if d1>=room.book4:
                        y=y+1
                if room.book5!=None:
                    if d1>=room.book5:
                        y=y+1
                if room.book6!=None:
                    if d1>=room.book6:
                        y=y+1
                if room.book7!=None:
                    if d1>=room.book7:
                        y=y+1
                if room.book8!=None:
                    if d1>=room.book8:
                        y=y+1
                if room.book9!=None:
                    if d1>=room.book9:
                        y=y+1
                if room.book10!=None:
                    if d1>=room.book10:
                        y=y+1
                
                print(y)

                
                


                if y>=data['capacity']:
                    print('success')

                    x = room.final_price
                    seller_pay = room.seller_price
                    x = x + room.cost_electricity + room.cost_water
                    seller_pay = seller_pay + room.cost_electricity + room.cost_water
                    if data['wifi']:
                        x=x+room.cost_wifi
                        seller_pay=seller_pay+room.cost_wifi
                    if data['house_TV']:
                        x=x+room.cost_TV
                        seller_pay=seller_pay+room.cost_TV
                    if data['room_TV']:
                        x=x+room.cost_roomTV
                        seller_pay=seller_pay+room.cost_roomTV
                    if data['house_refridgerator']:
                        x=x+room.cost_refridgerator
                        seller_pay=seller_pay+room.cost_refridgerator
                    if data['room_refridgerator']:
                        x=x+room.cost_roomrefridgerator
                        seller_pay=seller_pay+room.cost_roomrefridgerator
                    if data['purified_water']:
                        x=x+room.cost_purified_water
                        seller_pay=seller_pay+room.cost_purified_water
                    if data['geyser']:
                        x=x+room.cost_geyser
                        seller_pay=seller_pay+room.cost_geyser
                    if data['AC']:
                        x=x+room.cost_AC
                        seller_pay=seller_pay+room.cost_AC
                    if data['cooler']:
                        x=x+room.cost_cooler
                        seller_pay=seller_pay+room.cost_cooler
                    if data['lunch']:
                        x=x+room.cost_lunch
                        seller_pay=seller_pay+room.cost_lunch
                    if data['breakfast']:
                        x=x+room.cost_breakfast
                        seller_pay=seller_pay+room.cost_breakfast
                    if data['dinner']:
                        x=x+room.cost_dinner
                        seller_pay=seller_pay+room.cost_dinner

                    price = x*data['duration']*data['capacity']
                    seller_pay = seller_pay*data['duration']*data['capacity']

                    temp_coupon = 'None'


                    if data['coupon']!='none':

                        queryset = coupons.objects.all()
                        try:
                            coupon = get_object_or_404(queryset,pk=data['coupon'])

                            if request.user not in coupon.used_by.all() and datetime.date.today()<=coupon.expiry_date and datetime.date.today()>=coupon.valid_from and room in coupon.coupoun_rooms.all():
                                
                                if price>=coupon.min_price:

                                    if coupon.coupon_type=='discount':
                                        temp = (price*coupon.off)/100

                                        if coupon.max_off_price!=None:
                                            if temp>coupon.max_off_price:
                                                temp=coupon.max_off_price
                                        
                                        price = price - temp;
                                        if coupon.admin_coupon == False:
                                            seller_pay = seller_pay - temp;

                                        data['savings'] = data['savings']+temp
                                        data['discount'] = data['discount']+coupon.off

                                    if coupon.coupon_type=='off_price':
                                    
                                        price = price - coupon.off;
                                        if coupon.admin_coupon == False:
                                            seller_pay = seller_pay - coupon.off;

                                        data['savings'] = data['savings']+coupon.off

                                    coupon.used_by.add(request.user)
                                    temp_coupon = coupon.coupoun_code
                                    coupon.save()
                
                        except:
                            print('hy')
                            return Response('Coupon not applicable',status=status.HTTP_400_BAD_REQUEST)


                    end_date = book_date + relativedelta(months=+data['duration'])  

                    x = payment(price,room.currency[2:])

                    booking_new = roomBookings(room_id=room,payment_id=x['id'],extended_on=booking,is_extended=True,coupon=temp_coupon,room_name=room.title,customer_id=request.user,seller_id=room.seller_id,
                        booked_from=book_date,booked_till=end_date,capacity=data['capacity'],duration=data['duration'],first_name=data['firstname'],last_name=data['lastname'],mobile=data['mobile'],alternate_mobile=data['alternate_mobile'],
                        country_code=data['country_code'],wifi=data['wifi'],house_TV=data['house_TV'],room_TV=data['room_TV'],house_refridgerator=data['house_refridgerator'],room_refridgerator=data['room_refridgerator'],
                        purified_water=data['purified_water'],geyser=data['geyser'],AC=data['AC'],cooler=data['cooler'],breakfast=data['breakfast'],lunch=data['lunch'],dinner=data['dinner'],currency=room.currency,
                        savings=data['savings'],cost=room.price,seller_pay=seller_pay,paid=False,price_to_be_paid=price,discount=data['discount'])

                    booking_new.save() 

                   

                    booking.extended = True

                    booking.save()

                    serializer = roomBookingsSerializer(booking_new)                       

                    return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
                
                else:
                    return Response('error',status=status.HTTP_400_BAD_REQUEST)

            return Response(request.body,status=HTTP_400_BAD_REQUEST)

        except:

            print('no input')
            return Response('error',status=status.HTTP_400_BAD_REQUEST)


    def partial_update(self,request,pk=None):

        try: 
            data = json.loads(request.body.decode('utf-8'))['data']
            queryset = roomBookings.objects.all()
            queryset = queryset.filter(customer_id = request.user)
            queryset = queryset.filter(paid = True)
            booking = get_object_or_404(queryset,pk=pk)

            booking.cancellation_reason = data['reason']
            booking.feedback = data['feedback']
            booking.account_type=data['account_type']
            booking.account_no=data['account_no']
            booking.bank_name=data['bank_name']
            booking.bank_address=data['bank_address']
            booking.IFSC_code=data['IFSC_code']

            booking.save()

            return Response('success',status=status.HTTP_200_OK)

        except:
            return Response('error',status=status.HTTP_400_BAD_REQUEST)




class shop_booking(viewsets.ViewSet):

    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)

    def list(self,request):

        try:

            queryset = shopBookings.objects.all()

            if request.user.is_seller==True:
                queryset = queryset.filter(seller_id = request.user)
            else:
                queryset = queryset.filter(customer_id = request.user)

            queryset = queryset.filter(paid = True)

            serializer = shopBookingsSerializer(queryset,context={'request':request},many=True)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

        except:

            return Response('ERROR', status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self,request,pk=None):

        try:

            queryset = shopBookings.objects.all()
            if request.user.is_seller==True:
                queryset = queryset.filter(seller_id = request.user)
            else:
                queryset = queryset.filter(customer_id = request.user)

            queryset = queryset.filter(paid = True)
                
            booking = get_object_or_404(queryset,pk=pk)

            serializer = shopBookingsSerializer(booking,context={'request':request})
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

        except:

            return Response('ERROR', status=status.HTTP_400_BAD_REQUEST)

    def create(self,request,format=None):

        try:
            
            data = json.loads(request.body.decode('utf-8'))['data']

            if request.user.is_seller == False and request.user.profile_completed==True:

                queryset = shops.objects.all()
                room = get_object_or_404(queryset,pk=data['shopid'])

               
                book_date = datetime.date(data['year'], data['month'], data['date'])
                d1 = book_date - datetime.timedelta(days=1)

                
                

                if book_date<=datetime.date.today()+datetime.timedelta(days=15) and room.pausebooking==False and room.removed==False and d1>room.bookedtill:
                    

                    x = room.final_price
                    seller_pay = room.seller_price
                    x = x + room.cost_electricity + room.cost_water
                    seller_pay = seller_pay + room.cost_electricity + room.cost_water
                    if data['wifi']:
                        x=x+room.cost_wifi
                        seller_pay=seller_pay+room.cost_wifi
                    if data['TV']:
                        x=x+room.cost_TV
                        seller_pay=seller_pay+room.cost_TV
                    
                    if data['purified_water']:
                        x=x+room.cost_purified_water
                        seller_pay=seller_pay+room.cost_purified_water
                 
                    if data['AC']:
                        x=x+room.cost_AC
                        seller_pay=seller_pay+room.cost_AC
                    if data['cooler']:
                        x=x+room.cost_cooler
                        seller_pay=seller_pay+room.cost_cooler
                  

                    price = x*data['duration']
                    seller_pay = seller_pay*data['duration']

                    temp_coupon = 'None'


                    if data['coupon']!='none':

                        queryset = coupons.objects.all()
                        try:
                            coupon = get_object_or_404(queryset,pk=data['coupon'])

                            if request.user not in coupon.used_by.all() and datetime.date.today()<=coupon.expiry_date and datetime.date.today()>=coupon.valid_from and room in coupon.coupoun_shops.all():
                                
                                if price>=coupon.min_price:

                                    if coupon.coupon_type=='discount':
                                        temp = (price*coupon.off)/100

                                        if coupon.max_off_price!=None:
                                            if temp>coupon.max_off_price:
                                                temp=coupon.max_off_price
                                        
                                        price = price - temp;
                                        if coupon.admin_coupon == False:
                                            seller_pay = seller_pay - temp;

                                        data['savings'] = data['savings']+temp
                                        data['discount'] = data['discount']+coupon.off

                                    if coupon.coupon_type=='off_price':
                                    
                                        price = price - coupon.off;
                                        if coupon.admin_coupon == False:
                                            seller_pay = seller_pay - coupon.off;

                                        data['savings'] = data['savings']+coupon.off

                                    coupon.used_by.add(request.user)
                                    temp_coupon = coupon.coupoun_code
                                    coupon.save()
                
                        except:
                            return Response('Coupon not applicable',status=status.HTTP_400_BAD_REQUEST)


        
                    end_date = book_date + relativedelta(months=+data['duration'])  

                    x = payment(price,room.currency[2:])

                    booking = shopBookings(shop_id=room,payment_id=x['id'],coupon=temp_coupon,shop_name=room.title,customer_id=request.user,seller_id=room.seller_id,
                    booked_from=book_date,booked_till=end_date,duration=data['duration'],first_name=data['firstname'],last_name=data['lastname'],mobile=data['mobile'],alternate_mobile=data['alternate_mobile'],
                    country_code=data['country_code'],wifi=data['wifi'],TV=data['TV'],
                    purified_water=data['purified_water'],AC=data['AC'],cooler=data['cooler'],currency=room.currency,
                    savings=data['savings'],paid=False,seller_pay=seller_pay,cost=room.price,price_to_be_paid=price,discount=data['discount'])
                    
                    booking.save()
                    
                    serializer = shopBookingsSerializer(booking)

                    return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

                   
                else:
                    print('no input2')
                    return Response('error',status=status.HTTP_400_BAD_REQUEST)

            return Response(request.body,status=HTTP_400_BAD_REQUEST)

        except:

            print('no input3')
            return Response('error',status=status.HTTP_400_BAD_REQUEST)

    
    def destroy(self,request,pk=None):

        try:


            queryset = shopBookings.objects.all()
            queryset = queryset.filter(customer_id = request.user)
            queryset = queryset.filter(extended=False)
            queryset = queryset.filter(ended=False)
            queryset = queryset.filter(paid=True)
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
        except:
            return Response('error',status = status.HTTP_400_BAD_REQUEST)


    def update(self,request,pk=None):

        try:
            
            data = json.loads(request.body.decode('utf-8'))['data']
            queryset = shopBookings.objects.all()
            queryset = queryset.filter(customer_id=request.user)
            queryset = queryset.filter(extended=False)
            queryset = queryset.filter(ended=False)
            queryset = queryset.filter(cancelled=False)
            booking = get_object_or_404(queryset,pk=pk)
            data['shopid'] = booking.shop_id.shop_id

            data['firstname'] = booking.first_name 
            data['lastname'] = booking.last_name 
            data['mobile'] = booking.mobile 
            data['country_code'] = booking.country_code 
            data['alternate_mobile'] = booking.alternate_mobile 

           
            if request.user.is_seller == False:

                queryset = shops.objects.all()
                room = get_object_or_404(queryset,pk=data['shopid'])

                
                book_date = booking.booked_till + datetime.timedelta(days=1)
                d1 = book_date - datetime.timedelta(days=1)

                
                   


                if booking.booked_till==room.bookedtill:
                    print('success')

                    x = room.final_price
                    seller_pay = room.seller_price
                    x = x + room.cost_electricity + room.cost_water
                    seller_pay = seller_pay + room.cost_electricity + room.cost_water
                    if data['wifi']:
                        x=x+room.cost_wifi
                        seller_pay=seller_pay+room.cost_wifi
                    if data['TV']:
                        x=x+room.cost_TV
                        seller_pay=seller_pay+room.cost_TV
                   
                    if data['purified_water']:
                        x=x+room.cost_purified_water
                        seller_pay=seller_pay+room.cost_purified_water
                  
                    if data['AC']:
                        x=x+room.cost_AC
                        seller_pay=seller_pay+room.cost_AC
                    if data['cooler']:
                        x=x+room.cost_cooler
                        seller_pay=seller_pay+room.cost_cooler
                   

                    price = x*data['duration']
                    seller_pay = seller_pay*data['duration']

                    temp_coupon = 'None'


                    if data['coupon']!='none':

                        queryset = coupons.objects.all()
                        try:
                            coupon = get_object_or_404(queryset,pk=data['coupon'])

                            if request.user not in coupon.used_by.all() and datetime.date.today()<=coupon.expiry_date and datetime.date.today()>=coupon.valid_from and room in coupon.coupoun_shops.all():
                                
                                if price>=coupon.min_price:

                                    if coupon.coupon_type=='discount':
                                        temp = (price*coupon.off)/100

                                        if coupon.max_off_price!=None:
                                            if temp>coupon.max_off_price:
                                                temp=coupon.max_off_price
                                        
                                        price = price - temp;
                                        if coupon.admin_coupon == False:
                                            seller_pay = seller_pay - temp;

                                        data['savings'] = data['savings']+temp
                                        data['discount'] = data['discount']+coupon.off

                                    if coupon.coupon_type=='off_price':
                                    
                                        price = price - coupon.off;
                                        if coupon.admin_coupon == False:
                                            seller_pay = seller_pay - coupon.off;

                                        data['savings'] = data['savings']+coupon.off

                                    coupon.used_by.add(request.user)
                                    temp_coupon = coupon.coupoun_code
                                    coupon.save()
                
                        except:
                            print('hy')
                            return Response('Coupon not applicable',status=status.HTTP_400_BAD_REQUEST)

                        
                    
                    print('payment')

                    end_date = book_date + relativedelta(months=+data['duration'])  

                    x = payment(price,room.currency[2:])

                    booking_new = shopBookings(shop_id=room,payment_id=x['id'],extended_on=booking,is_extended=True,coupon=temp_coupon,shop_name=room.title,customer_id=request.user,seller_id=room.seller_id,
                        booked_from=book_date,booked_till=end_date,duration=data['duration'],first_name=data['firstname'],last_name=data['lastname'],mobile=data['mobile'],alternate_mobile=data['alternate_mobile'],
                        country_code=data['country_code'],wifi=data['wifi'],TV=data['TV'],
                        purified_water=data['purified_water'],AC=data['AC'],cooler=data['cooler'],currency=room.currency,
                        savings=data['savings'],paid=False,cost=room.price,seller_pay=seller_pay,price_to_be_paid=price,discount=data['discount'])

                    booking_new.save()  

                                              

                    booking.extended = True

                    booking.save()



                    serializer = shopBookingsSerializer(booking_new)

                    return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

                   
                else:
                    return Response('error',status=status.HTTP_400_BAD_REQUEST)

            return Response(request.body,status=HTTP_400_BAD_REQUEST)

        except:

            print('no input')
            return Response('error',status=status.HTTP_400_BAD_REQUEST)


    def partial_update(self,request,pk=None):

        try: 
            data = json.loads(request.body.decode('utf-8'))['data']
            queryset = shopBookings.objects.all()
            queryset = queryset.filter(customer_id = request.user)
            queryset = queryset.filter(paid = True)
            booking = get_object_or_404(queryset,pk=pk)

            booking.cancellation_reason = data['reason']
            booking.feedback = data['feedback']
            booking.account_type=data['account_type']
            booking.account_no=data['account_no']
            booking.bank_name=data['bank_name']
            booking.bank_address=data['bank_address']
            booking.IFSC_code=data['IFSC_code']
            booking.save()

            return Response('success',status=status.HTTP_200_OK)

        except:
            return Response('error',status=status.HTTP_400_BAD_REQUEST)






class apartment_booking(viewsets.ViewSet):

    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)

    def list(self,request):

        try:

            queryset = apartmentBookings.objects.all()

            if request.user.is_seller==True:
                queryset = queryset.filter(seller_id = request.user)
            else:
                queryset = queryset.filter(customer_id = request.user)
            queryset = queryset.filter(paid = True)

            serializer = apartmentBookingsSerializer(queryset,context={'request':request},many=True)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

        except:

            return Response('ERROR', status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self,request,pk=None):

        try:

            queryset = apartmentBookings.objects.all()
            if request.user.is_seller==True:
                queryset = queryset.filter(seller_id = request.user)
            else:
                queryset = queryset.filter(customer_id = request.user)
            queryset = queryset.filter(paid = True)
                
            booking = get_object_or_404(queryset,pk=pk)

            serializer = apartmentBookingsSerializer(booking,context={'request':request})
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

        except:

            return Response('ERROR', status=status.HTTP_400_BAD_REQUEST)

    def create(self,request,format=None):

        try:
            
            data = json.loads(request.body.decode('utf-8'))['data']

            if request.user.is_seller == False and request.user.profile_completed==True:

                queryset = apartments.objects.all()
                room = get_object_or_404(queryset,pk=data['apartmentid'])

               
                book_date = datetime.date(data['year'], data['month'], data['date'])
                d1 = book_date - datetime.timedelta(days=1)

                
                

                if book_date<=datetime.date.today()+datetime.timedelta(days=15) and room.pausebooking==False and room.removed==False and d1>room.bookedtill:
                    

                    x = room.final_price
                    seller_pay = room.seller_price
                    x = x + room.cost_electricity + room.cost_water
                    seller_pay = seller_pay + room.cost_electricity + room.cost_water
                    if data['wifi']:
                        x=x+room.cost_wifi
                        seller_pay=seller_pay+room.cost_wifi
                    if data['TV']:
                        x=x+room.cost_TV
                        seller_pay=seller_pay+room.cost_TV

                    if data['house_refridgerator']:
                        x=x+room.cost_refridgerator
                        seller_pay=seller_pay+room.cost_refridgerator

                    if data['geyser']:
                        x=x+room.cost_geyser
                        seller_pay=seller_pay+room.cost_geyser
                    
                    if data['laundry']:
                        x=x+room.cost_laundry
                        seller_pay=seller_pay+room.cost_laundry
                    
                    if data['purified_water']:
                        x=x+room.cost_purified_water
                        seller_pay=seller_pay+room.cost_purified_water
                 
                    if data['AC']:
                        x=x+room.cost_AC
                        seller_pay=seller_pay+room.cost_AC
                    if data['cooler']:
                        x=x+room.cost_cooler
                        seller_pay=seller_pay+room.cost_cooler
                  

                    price = x*data['duration']
                    seller_pay = seller_pay*data['duration']

                    temp_coupon = 'None'


                    if data['coupon']!='none':

                        queryset = coupons.objects.all()
                        try:
                            coupon = get_object_or_404(queryset,pk=data['coupon'])

                            if request.user not in coupon.used_by.all() and datetime.date.today()<=coupon.expiry_date and datetime.date.today()>=coupon.valid_from and room in coupon.coupoun_apartments.all():
                                
                                if price>=coupon.min_price:

                                    if coupon.coupon_type=='discount':
                                        temp = (price*coupon.off)/100

                                        if coupon.max_off_price!=None:
                                            if temp>coupon.max_off_price:
                                                temp=coupon.max_off_price
                                        
                                        price = price - temp;
                                        if coupon.admin_coupon == False:
                                            seller_pay = seller_pay - temp;

                                        data['savings'] = data['savings']+temp
                                        data['discount'] = data['discount']+coupon.off

                                    if coupon.coupon_type=='off_price':
                                    
                                        price = price - coupon.off;
                                        if coupon.admin_coupon == False:
                                            seller_pay = seller_pay - coupon.off;

                                        data['savings'] = data['savings']+coupon.off

                                    coupon.used_by.add(request.user)
                                    temp_coupon = coupon.coupoun_code
                                    coupon.save()
                
                        except:
                            return Response('Coupon not applicable',status=status.HTTP_400_BAD_REQUEST)


 

                    end_date = book_date + relativedelta(months=+data['duration'])  

                    x = payment(price,room.currency[2:])

                    booking = apartmentBookings(apartment_id=room,payment_id=x['id'],coupon=temp_coupon,apartment_name=room.title,customer_id=request.user,seller_id=room.seller_id,
                    booked_from=book_date,booked_till=end_date,duration=data['duration'],first_name=data['firstname'],last_name=data['lastname'],mobile=data['mobile'],alternate_mobile=data['alternate_mobile'],
                    country_code=data['country_code'],wifi=data['wifi'],TV=data['TV'],house_refridgerator=data['house_refridgerator'],geyser=data['geyser'],laundry=data['laundry'],
                    purified_water=data['purified_water'],AC=data['AC'],cooler=data['cooler'],currency=room.currency,
                    savings=data['savings'],paid=False,seller_pay=seller_pay,cost=room.price,price_to_be_paid=price,discount=data['discount'])
                    
                    booking.save()
                    
                    serializer = apartmentBookingsSerializer(booking)

                    return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

                   
                else:
                    print('no input2')
                    return Response('error',status=status.HTTP_400_BAD_REQUEST)

            return Response(request.body,status=status.HTTP_400_BAD_REQUEST)

        except:

            print('no input3')
            return Response('error',status=status.HTTP_400_BAD_REQUEST)

        
    
    def destroy(self,request,pk=None):

        try:


            queryset = apartmentBookings.objects.all()
            queryset = queryset.filter(customer_id = request.user)
            queryset = queryset.filter(extended=False)
            queryset = queryset.filter(ended=False)
            queryset = queryset.filter(paid=True)
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
        except:
            return Response('error',status = status.HTTP_400_BAD_REQUEST)


    def update(self,request,pk=None):

        try:
        
            data = json.loads(request.body.decode('utf-8'))['data']
            
            queryset = apartmentBookings.objects.all()
            queryset = queryset.filter(customer_id=request.user)
            queryset = queryset.filter(extended=False)
            queryset = queryset.filter(paid=True)
            queryset = queryset.filter(ended=False)
            queryset = queryset.filter(cancelled=False)
            booking = get_object_or_404(queryset,pk=pk)
            data['apartmentid'] = booking.apartment_id.apartment_id

            data['firstname'] = booking.first_name 
            data['lastname'] = booking.last_name 
            data['mobile'] = booking.mobile 
            data['country_code'] = booking.country_code 
            data['alternate_mobile'] = booking.alternate_mobile 

            
            if request.user.is_seller == False:

                queryset = apartments.objects.all()
                room = get_object_or_404(queryset,pk=data['apartmentid'])

                
                book_date = booking.booked_till + datetime.timedelta(days=1)
                d1 = book_date - datetime.timedelta(days=1)
                

                


                if booking.booked_till==room.bookedtill:
                    print('success')

                    x = room.final_price
                    seller_pay = room.seller_price
                    x = x + room.cost_electricity + room.cost_water
                    seller_pay = seller_pay + room.cost_electricity + room.cost_water
                    if data['wifi']:
                        x=x+room.cost_wifi
                        seller_pay=seller_pay+room.cost_wifi
                    if data['TV']:
                        x=x+room.cost_TV
                        seller_pay=seller_pay+room.cost_TV
                    
                    if data['purified_water']:
                        x=x+room.cost_purified_water
                        seller_pay=seller_pay+room.cost_purified_water

                    if data['house_refridgerator']:
                        x=x+room.cost_refridgerator
                        seller_pay=seller_pay+room.cost_refridgerator

                    if data['geyser']:
                        x=x+room.cost_geyser
                        seller_pay=seller_pay+room.cost_geyser
                    
                    if data['laundry']:
                        x=x+room.cost_laundry
                        seller_pay=seller_pay+room.cost_laundry
                    
                    if data['AC']:
                        x=x+room.cost_AC
                        seller_pay=seller_pay+room.cost_AC
                    if data['cooler']:
                        x=x+room.cost_cooler
                        seller_pay=seller_pay+room.cost_cooler
                    

                    price = x*data['duration']
                    seller_pay = seller_pay*data['duration']

                    temp_coupon = 'None'


                    if data['coupon']!='none':

                        queryset = coupons.objects.all()
                        try:
                            coupon = get_object_or_404(queryset,pk=data['coupon'])

                            if request.user not in coupon.used_by.all() and datetime.date.today()<=coupon.expiry_date and datetime.date.today()>=coupon.valid_from and room in coupon.coupoun_apartments.all():
                                
                                if price>=coupon.min_price:

                                    if coupon.coupon_type=='discount':
                                        temp = (price*coupon.off)/100

                                        if coupon.max_off_price!=None:
                                            if temp>coupon.max_off_price:
                                                temp=coupon.max_off_price
                                        
                                        price = price - temp;
                                        if coupon.admin_coupon == False:
                                            seller_pay = seller_pay - temp;

                                        data['savings'] = data['savings']+temp
                                        data['discount'] = data['discount']+coupon.off

                                    if coupon.coupon_type=='off_price':
                                    
                                        price = price - coupon.off;
                                        if coupon.admin_coupon == False:
                                            seller_pay = seller_pay - coupon.off;

                                        data['savings'] = data['savings']+coupon.off

                                    coupon.used_by.add(request.user)
                                    temp_coupon = coupon.coupoun_code
                                    coupon.save()
                
                        except:
                            print('hy')
                            return Response('Coupon not applicable',status=status.HTTP_400_BAD_REQUEST)

                        
                    

                    end_date = book_date + relativedelta(months=+data['duration'])  

                    x = payment(price,room.currency[2:])

                    booking_new = apartmentBookings(apartment_id=room,payment_id=x['id'],extended_on=booking,is_extended=True,coupon=temp_coupon,apartment_name=room.title,customer_id=request.user,seller_id=room.seller_id,
                        booked_from=book_date,booked_till=end_date,duration=data['duration'],first_name=data['firstname'],last_name=data['lastname'],mobile=data['mobile'],alternate_mobile=data['alternate_mobile'],
                        country_code=data['country_code'],wifi=data['wifi'],TV=data['TV'],house_refridgerator=data['house_refridgerator'],geyser=data['geyser'],laundry=data['laundry'],
                        purified_water=data['purified_water'],AC=data['AC'],cooler=data['cooler'],currency=room.currency,
                        savings=data['savings'],paid=False,seller_pay=seller_pay,cost=room.price,price_to_be_paid=price,discount=data['discount'])
                        
                    booking_new.save()  

                

                                                

                    booking.extended = True

                    booking.save()

                    serializer = apartmentBookingsSerializer(booking_new)

                    return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

                    
                else:
                    return Response('error',status=status.HTTP_400_BAD_REQUEST)

            return Response(request.body,status=status.HTTP_400_BAD_REQUEST)

        except:
            Response(request.body,status=status.HTTP_400_BAD_REQUEST)


       


    def partial_update(self,request,pk=None):

        try: 
            data = json.loads(request.body.decode('utf-8'))['data']
            queryset = apartmentBookings.objects.all()
            queryset = queryset.filter(customer_id = request.user)
            queryset = queryset.filter(paid=True)
            booking = get_object_or_404(queryset,pk=pk)

            booking.cancellation_reason = data['reason']
            booking.feedback = data['feedback']
            booking.account_type=data['account_type']
            booking.account_no=data['account_no']
            booking.bank_name=data['bank_name']
            booking.bank_address=data['bank_address']
            booking.IFSC_code=data['IFSC_code']
            booking.save()

            return Response('success',status=status.HTTP_200_OK)

        except:
            return Response('error',status=status.HTTP_400_BAD_REQUEST)




    




