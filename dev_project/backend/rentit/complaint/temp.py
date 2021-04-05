
class apartment_complaint(viewsets.ViewSet):
    
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)


    def list(self,request):

       
        try:
            queryset = apartment_complaints.objects.all()
            if request.user.is_superuser or request.user.is_staff:
                None
            else:
                queryset = queryset.filter(customer_id= request.user)

            serializer = apartment_complaints_serializer(queryset,context={'request':request},many=True)

            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

        except:

            return Response('ERROR', status=status.HTTP_400_BAD_REQUEST)


    def retrieve(self,request,pk=None):
        
        try:
            queryset = apartment_complaints.objects.all()
            if request.user.is_superuser or request.user.is_staff:
                complaint = get_object_or_404(queryset,pk=pk)
            else:
                queryset = queryset.filter(customer_id= request.user)
                complaint = get_object_or_404(queryset,pk=pk)

            serializer = apartment_complaints_serializer(complaint,context={'request':request})

            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

        except:

            return Response('ERROR', status=status.HTTP_400_BAD_REQUEST)

    def create(self,request):
       

        
        try:
        

            if request.user.is_seller==False:

                queryset = apartmentBookings.objects.all()
                queryset = queryset.filter(customer_id = request.user)

                room = get_object_or_404(apartments.objects.all(),pk=request.data['room_id'])
            

                x=False

                for booking in queryset:
                    if booking.apartment_id == room:
                        x=True
                    
                        break

                if x ==True:
                    

                    complaint = apartment_complaints(apartment_id=room,apartment_name=room.title,customer_id=request.user,
                    customer_name=request.user.first_name+' '+ request.user.last_name,
                    subject=request.data["subject"],
                    message=request.data["message"],photo1=request.data["photo"],customer_contact=request.user.email)

                    complaint.save()

                    set1 = user.objects_new.all()

                    for user1 in set1:
                        if user1.is_superuser or user1.is_staff:
                            complaint.seller_id.add(user1)
                    
                    complaint.save()

                   


                    subject = 'Complaint Issued'
                    message = 'A complaint has been issued for the apartment. You can check the details in your dashboard.'
                    email_send(subject,message,request.user.email)

                    serializer = apartment_complaints_serializer(complaint,context={'request':request})

                    return Response(serializer.data,status=status.HTTP_201_CREATED)

            return Response('Error',status=status.HTTP_400_BAD_REQUEST)

        except:
            return Response('Error',status=status.HTTP_400_BAD_REQUEST)



    def update(self,request,pk=None):

        
        try:

            queryset = apartment_complaints.objects.all()
            
            if request.user.is_superuser or request.user.is_staff:
                
                complaint = get_object_or_404(queryset,pk=pk)
            else:
                queryset = queryset.filter(customer_id= request.user)
                complaint = get_object_or_404(queryset,pk=pk)
            
            if request.user.is_superuser or request.user.is_staff:
                
                message = message_class(sender_id=request.user,
                message=request.data["message"],photo=request.data["photo"])
                message.save()
                print(complaint.customer_id)

                message.receiver_id.add(complaint.customer_id)
                message.save()
            else:
            
                message = message_class(sender_id=request.user,
                message=request.data["message"],photo=request.data["photo"])
                message.save()
                for user1 in complaint.seller_id.all():
                    message.receiver_id.add(user1)
                message.save()

            complaint.messages.add(message)

            complaint.save()

            serializer = message_serializer(complaint.messages.all(),context={'request':request},many=True)

            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

        except:

            return Response('ERROR', status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self,request,pk=None):
        try:


            queryset = apartment_complaints.objects.all()
            
            if request.user.is_superuser and request.user.is_staff:
                complaint = get_object_or_404(queryset,pk=pk)
                complaint.seller_fullfilled = True
            else:
                queryset = queryset.filter(customer_id= request.user)
                complaint = get_object_or_404(queryset,pk=pk)
                complaint.customer_fullfilled = True

            complaint.save()      

            if complaint.seller_fullfilled and complaint.customer_fullfilled:
                


                subject = 'Complaint Closed'
                message = 'The complaint has been closed for the apartment. You can check the details in your dashboard.'
                email_send(subject,message,request.user)
            
      

            serializer = apartment_complaints_serializer(complaint,context={'request':request})

            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

        except:

            return Response('ERROR', status=status.HTTP_400_BAD_REQUEST)