

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



                        
                    x = payment()

                    if x == 'payment successful':


                        seller = get_object_or_404(seller_bank_details.objects.all(),pk=room.seller_id)

                        seller_pay = seller_pay - (seller_pay*seller.commission/100)

                        seller.total_due_payment = seller.total_due_payment+seller_pay

                        seller.save()

                        print('success')

                        end_date = book_date + relativedelta(months=+data['duration'])  

                        booking = apartmentBookings(apartment_id=room,coupon=temp_coupon,apartment_name=room.title,customer_id=request.user,seller_id=room.seller_id,
                        booked_from=book_date,booked_till=end_date,duration=data['duration'],first_name=data['firstname'],last_name=data['lastname'],mobile=data['mobile'],alternate_mobile=data['alternate_mobile'],
                        country_code=data['country_code'],wifi=data['wifi'],TV=data['TV'],house_refridgerator=data['house_refridgerator'],geyser=data['geyser'],laundry=data['laundry'],
                        purified_water=data['purified_water'],AC=data['AC'],cooler=data['cooler'],currency=room.currency,
                        savings=data['savings'],seller_pay=seller_pay,cost=room.price,price_to_be_paid=price,discount=data['discount'])
                        
                        booking.save()
                        
                        room.trust_points = room.trust_points + 10*int(data['duration'])

                        room.booked = True
                        room.bookedtill = end_date

                        subject = 'Booking Confirmed'
                        message = 'Booking has been successfull made.'
                        email_send(subject,message,request.user,room.seller_id)
                        room.save() 

                        return Response('Success',status=status.HTTP_202_ACCEPTED)

                    else:
                        print('no input1')
                        return Response('Payment failed',status=status.HTTP_400_BAD_REQUEST)
                else:
                    print('no input2')
                    return Response('error',status=status.HTTP_400_BAD_REQUEST)

            return Response(request.body,status=status.HTTP_202_ACCEPTED)

        except:

            print('no input3')
            return Response('error',status=status.HTTP_400_BAD_REQUEST)

    
    def destroy(self,request,pk=None):

        try:


            queryset = apartmentBookings.objects.all()
            queryset = queryset.filter(customer_id = request.user)
            queryset = queryset.filter(extended=False)
            queryset = queryset.filter(ended=False)
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

                        
                    x = payment()

                    if x == 'payment successful':
                        print('payment')

                        end_date = book_date + relativedelta(months=+data['duration'])  

                        booking_new = apartmentBookings(apartment_id=room,extended_on=booking,is_extended=True,coupon=temp_coupon,apartment_name=room.title,customer_id=request.user,seller_id=room.seller_id,
                            booked_from=book_date,booked_till=end_date,duration=data['duration'],first_name=data['firstname'],last_name=data['lastname'],mobile=data['mobile'],alternate_mobile=data['alternate_mobile'],
                            country_code=data['country_code'],wifi=data['wifi'],TV=data['TV'],house_refridegerator=data['house_refridegerator'],geyser=data['geyser'],laundry=data['laundry'],
                            purified_water=data['purified_water'],AC=data['AC'],cooler=data['cooler'],currency=room.currency,
                            savings=data['savings'],cost=room.price,seller_pay=seller_pay,price_to_be_paid=price,discount=data['discount'])

                        booking_new.save()  

                        room.trust_points = room.trust_points + 10*int(data['duration'])                          

                        booking.extended = True

                        booking.save()

                        seller = get_object_or_404(seller_bank_details.objects.all(),pk=room.seller_id)

                        seller_pay = seller_pay - (seller_pay*seller.commission/100)

                        seller.total_due_payment = seller.total_due_payment+seller_pay

                        seller.save()

                        subject = 'Booking Extended'
                        message = 'Booking has been successfull extended.'
                        email_send(subject,message,request.user,room.seller_id)

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



                        return Response('Success',status=status.HTTP_202_ACCEPTED)

                    else:
                        return Response('Payment failed',status=status.HTTP_400_BAD_REQUEST)
                else:
                    return Response('error',status=status.HTTP_400_BAD_REQUEST)

            return Response(request.body,status=status.HTTP_202_ACCEPTED)

        except:

            print('no input')
            return Response('error',status=status.HTTP_400_BAD_REQUEST)


    def partial_update(self,request,pk=None):

        try: 
            data = json.loads(request.body.decode('utf-8'))['data']
            queryset = apartmentBookings.objects.all()
            queryset = queryset.filter(customer_id = request.user)
            booking = get_object_or_404(queryset,pk=pk)

            booking.cancellation_reason = data['reason']
            booking.feedback = data['feedback']
            booking.save()

            return Response('success',status=status.HTTP_200_OK)

        except:
            return Response('error',status=status.HTTP_400_BAD_REQUEST)