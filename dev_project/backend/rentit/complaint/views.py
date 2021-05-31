

# Create your views here.



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

from .models import room_complaints,shop_complaints,apartment_complaints,message_class
from .serializer import room_complaints_serializer,shop_complaints_serializer,apartment_complaints_serializer,message_serializer

from products.models import rooms,shops,apartments

from email1 import email_send
from bookings.models import roomBookings,shopBookings,apartmentBookings

from django.template import Context
from django.template.loader import render_to_string, get_template
from django.core.mail import EmailMessage
from rentit.settings import EMAIL_HOST_USER





from django.contrib.auth import get_user_model
utc=pytz.UTC
user=get_user_model()




class room_complaint(viewsets.ViewSet):
    
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)


    def list(self,request):

       
        try:
            queryset = room_complaints.objects.all()
            if request.user.is_superuser or request.user.is_staff:
                None
            else:
                queryset = queryset.filter(customer_id= request.user)

            serializer = room_complaints_serializer(queryset,context={'request':request},many=True)

            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

        except:

            return Response('ERROR', status=status.HTTP_400_BAD_REQUEST)


    def retrieve(self,request,pk=None):
        
        try:
            queryset = room_complaints.objects.all()
            if request.user.is_superuser or request.user.is_staff:
                complaint = get_object_or_404(queryset,pk=pk)
            else:
                queryset = queryset.filter(customer_id= request.user)
                complaint = get_object_or_404(queryset,pk=pk)

            serializer = room_complaints_serializer(complaint,context={'request':request})

            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

        except:

            return Response('ERROR', status=status.HTTP_400_BAD_REQUEST)

    def create(self,request):

        
       

        
        try:
        

            if request.user.is_seller==False:

                queryset = roomBookings.objects.all()
                queryset = queryset.filter(customer_id = request.user)

                room = get_object_or_404(queryset,pk=request.data['room_id'])
            

                x=True

                

                if x ==True:
                    

                    complaint = room_complaints(room_id=room,room_name=room.room_name,customer_id=request.user,
                    customer_name=request.user.first_name+' '+ request.user.last_name,
                    subject=request.data["subject"],
                    message=request.data["message"],photo1=request.data["photo"],customer_contact=request.user.email)

                    complaint.save()

                    set1 = user.objects_new.all()

                    for user1 in set1:
                        if user1.is_superuser or user1.is_staff:
                            complaint.seller_id.add(user1)
                    
                    complaint.save()

                   


                    ctx = {
                    'user': request.user.first_name+' '+request.user.last_name,
                    'cid':complaint.complaint_id,
                    }
                    message = get_template('complaint.html').render(ctx)
                    msg = EmailMessage(
                        'Complaint issued',
                        message,
                        EMAIL_HOST_USER,
                        [request.user],
                    )
                    msg.content_subtype = "html"  # Main content is now text/html
                    msg.send()

                    serializer = room_complaints_serializer(complaint,context={'request':request})

                    return Response(serializer.data,status=status.HTTP_201_CREATED)

            return Response('Error',status=status.HTTP_400_BAD_REQUEST)

        except:
            return Response('Error',status=status.HTTP_400_BAD_REQUEST)



    def update(self,request,pk=None):

        
        try:

            queryset = room_complaints.objects.all()
            
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


            queryset = room_complaints.objects.all()
            
            if request.user.is_superuser and request.user.is_staff:
                complaint = get_object_or_404(queryset,pk=pk)
                complaint.seller_fullfilled = True
            else:
                queryset = queryset.filter(customer_id= request.user)
                complaint = get_object_or_404(queryset,pk=pk)
                complaint.customer_fullfilled = True

            complaint.save()      

            if complaint.seller_fullfilled and complaint.customer_fullfilled:
                


                ctx = {
                'user': request.user.first_name+' '+request.user.last_name,
                'cid':complaint.complaint_id,
                }
                message = get_template('complaintclosed.html').render(ctx)
                msg = EmailMessage(
                    'Complaint closed',
                    message,
                    EMAIL_HOST_USER,
                    [request.user],
                )
                msg.content_subtype = "html"  # Main content is now text/html
                msg.send()
            
      

            serializer = room_complaints_serializer(complaint,context={'request':request})

            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

        except:

            return Response('ERROR', status=status.HTTP_400_BAD_REQUEST)
















class shop_complaint(viewsets.ViewSet):
    
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)


    def list(self,request):

       
        try:
            queryset = shop_complaints.objects.all()
            if request.user.is_superuser or request.user.is_staff:
                None
            else:
                queryset = queryset.filter(customer_id= request.user)

            serializer = shop_complaints_serializer(queryset,context={'request':request},many=True)

            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

        except:

            return Response('ERROR', status=status.HTTP_400_BAD_REQUEST)


    def retrieve(self,request,pk=None):
        
        try:
            queryset = shop_complaints.objects.all()
            if request.user.is_superuser or request.user.is_staff:
                complaint = get_object_or_404(queryset,pk=pk)
            else:
                queryset = queryset.filter(customer_id= request.user)
                complaint = get_object_or_404(queryset,pk=pk)

            serializer = shop_complaints_serializer(complaint,context={'request':request})

            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

        except:

            return Response('ERROR', status=status.HTTP_400_BAD_REQUEST)

    def create(self,request):
       

        
        try:
        

            if request.user.is_seller==False:

                queryset = shopBookings.objects.all()
                queryset = queryset.filter(customer_id = request.user)

                room = get_object_or_404(queryset,pk=request.data['room_id'])
            

                x=True

                

                if x ==True:
                    

                    complaint = shop_complaints(shop_id=room,shop_name=room.shop_name,customer_id=request.user,
                    customer_name=request.user.first_name+' '+ request.user.last_name,
                    subject=request.data["subject"],
                    message=request.data["message"],photo1=request.data["photo"],customer_contact=request.user.email)

                    complaint.save()

                    set1 = user.objects_new.all()

                    for user1 in set1:
                        if user1.is_superuser or user1.is_staff:
                            complaint.seller_id.add(user1)
                    
                    complaint.save()

                   


                    ctx = {
                    'user': request.user.first_name+' '+request.user.last_name,
                    'cid':complaint.complaint_id,
                    }
                    message = get_template('complaint.html').render(ctx)
                    msg = EmailMessage(
                        'Complaint issued',
                        message,
                        EMAIL_HOST_USER,
                        [request.user],
                    )
                    msg.content_subtype = "html"  # Main content is now text/html
                    msg.send()

                    serializer = shop_complaints_serializer(complaint,context={'request':request})

                    return Response(serializer.data,status=status.HTTP_201_CREATED)

            return Response('Error',status=status.HTTP_400_BAD_REQUEST)

        except:
            return Response('Error',status=status.HTTP_400_BAD_REQUEST)



    def update(self,request,pk=None):

        
        try:

            queryset = shop_complaints.objects.all()
            
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


            queryset = shop_complaints.objects.all()
            
            if request.user.is_superuser and request.user.is_staff:
                complaint = get_object_or_404(queryset,pk=pk)
                complaint.seller_fullfilled = True
            else:
                queryset = queryset.filter(customer_id= request.user)
                complaint = get_object_or_404(queryset,pk=pk)
                complaint.customer_fullfilled = True

            complaint.save()      

            if complaint.seller_fullfilled and complaint.customer_fullfilled:
                


                ctx = {
                'user': request.user.first_name+' '+request.user.last_name,
                'cid':complaint.complaint_id,
                }
                message = get_template('complaintclosed.html').render(ctx)
                msg = EmailMessage(
                    'Complaint closed',
                    message,
                    EMAIL_HOST_USER,
                    [request.user],
                )
                msg.content_subtype = "html"  # Main content is now text/html
                msg.send()
            
      

            serializer = shop_complaints_serializer(complaint,context={'request':request})

            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

        except:

            return Response('ERROR', status=status.HTTP_400_BAD_REQUEST)

















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

                room = get_object_or_404(queryset,pk=request.data['room_id'])
            

                x=True

                
                if x ==True:
                    

                    complaint = apartment_complaints(apartment_id=room,apartment_name=room.apartment_name,customer_id=request.user,
                    customer_name=request.user.first_name+' '+ request.user.last_name,
                    subject=request.data["subject"],
                    message=request.data["message"],photo1=request.data["photo"],customer_contact=request.user.email)

                    complaint.save()

                    set1 = user.objects_new.all()

                    for user1 in set1:
                        if user1.is_superuser or user1.is_staff:
                            complaint.seller_id.add(user1)
                    
                    complaint.save()

                   


                    ctx = {
                    'user': request.user.first_name+' '+request.user.last_name,
                    'cid':complaint.complaint_id,
                    }
                    message = get_template('complaint.html').render(ctx)
                    msg = EmailMessage(
                        'Complaint issued',
                        message,
                        EMAIL_HOST_USER,
                        [request.user],
                    )
                    msg.content_subtype = "html"  # Main content is now text/html
                    msg.send()

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
                


                ctx = {
                'user': request.user.first_name+' '+request.user.last_name,
                'cid':complaint.complaint_id,
                }
                message = get_template('complaintclosed.html').render(ctx)
                msg = EmailMessage(
                    'Complaint closed',
                    message,
                    EMAIL_HOST_USER,
                    [request.user],
                )
                msg.content_subtype = "html"  # Main content is now text/html
                msg.send()
            
      

            serializer = apartment_complaints_serializer(complaint,context={'request':request})

            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

        except:

            return Response('ERROR', status=status.HTTP_400_BAD_REQUEST)








class get_message(viewsets.ViewSet):
    
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)

    def retrieve(self,request,pk=None):
        

        try:
            type1= request.query_params.get('type')

            if type1=='room':
                queryset = room_complaints.objects.all()
                if request.user.is_superuser or request.user.is_staff:
                    complaint = get_object_or_404(queryset,pk=pk)
                else:
                    queryset = queryset.filter(customer_id= request.user)
                    complaint = get_object_or_404(queryset,pk=pk)

                

                serializer = message_serializer(complaint.messages.all(),context={'request':request},many=True)

                return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

            elif type1=='shop':
                queryset = shop_complaints.objects.all()
                if request.user.is_superuser or request.user.is_staff:
                   
                    complaint = get_object_or_404(queryset,pk=pk)
                else:
                    queryset = queryset.filter(customer_id= request.user)
                    complaint = get_object_or_404(queryset,pk=pk)

                

                serializer = message_serializer(complaint.messages.all(),context={'request':request},many=True)

                return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

            elif type1=='apartment':
                queryset = apartment_complaints.objects.all()
                if request.user.is_superuser or request.user.is_staff:

                    complaint = get_object_or_404(queryset,pk=pk)
                else:
                    queryset = queryset.filter(customer_id= request.user)
                    complaint = get_object_or_404(queryset,pk=pk)

                

                serializer = message_serializer(complaint.messages.all(),context={'request':request},many=True)

                return Response(serializer.data,status=status.HTTP_202_ACCEPTED)



        except:

            return Response('ERROR', status=status.HTTP_400_BAD_REQUEST)
    


        



