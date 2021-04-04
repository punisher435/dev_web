

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

from .models import room_complaints
from .serializer import room_complaints_serializer

from products.models import rooms,shops,apartments

from email1 import email_send
from bookings.models import roomBookings,shopBookings,apartmentBookings

utc=pytz.UTC




class room_complaint(viewsets.ViewSet):
    
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)


    def list(self,request):
        try:
            queryset = room_complaints.objects.all()
            if request.user.is_seller:
                queryset = queryset.filter(seller_id= request.user)
            else:
                queryset = queryset.filter(customer_id= request.user)

            serializer = room_complaints_serializer(queryset,context={'request':request},many=True)

            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

        except:

            return Response('ERROR', status=status.HTTP_400_BAD_REQUEST)


    def retrieve(self,request,pk=None):
        
        try:
            queryset = room_complaints.objects.all()
            if request.user.is_seller:
                queryset = queryset.filter(seller_id= request.user)
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
        

            if request.user.is_seller==True:

                queryset = roomBookings.objects.all()
                queryset = queryset.filter(customer_id = request.user)

                room = get_object_or_404(rooms.objects.all(),pk=request.data['room_id'])
            

                x=False

                for booking in queryset:
                    if booking.room_id == room:
                        x=True
                    
                        break

                if x ==True:
                    

                    complaint = room_complaints(room_id=room,room_name=room.title,customer_id=request.user,
                    customer_name=request.user.first_name+' '+ request.user.last_name,seller_id=room.seller_id,
                    seller_name=room.seller_id.first_name+' '+ room.seller_id.last_name,subject=request.data["subject"],
                    message=request.data["message"],photo1=request.data["photo"])

                    complaint.save()

                    serializer = room_complaints_serializer(complaint,context={'request':request})

                    return Response(serializer.data,status=status.HTTP_201_CREATED)

            return Response('Error',status=status.HTTP_400_BAD_REQUEST)

        except:
            return Response('Error',status=status.HTTP_400_BAD_REQUEST)



    def update(self,request,pk=None):

        try:

            data = json.loads(request.body.decode('utf-8'))['data']

            queryset = room_complaints.objects.all()
            
            queryset = queryset.filter(seller_id= request.user)
            complaint = get_object_or_404(queryset,pk=pk)
           
            if complaint.reply!=None or complaint.reply!='':
                complaint.reply = data
                complaint.save()
            

            serializer = room_complaints_serializer(complaint,context={'request':request})

            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

        except:

            return Response('ERROR', status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self,request,pk=None):
        try:


            queryset = room_complaints.objects.all()
            
            if request.user.is_seller:
                queryset = queryset.filter(seller_id= request.user)
                complaint = get_object_or_404(queryset,pk=pk)
                complaint.seller_fullfilled = True
            else:
                queryset = queryset.filter(customer_id= request.user)
                complaint = get_object_or_404(queryset,pk=pk)
                complaint.customer_fullfilled = True

            complaint.save()            

            serializer = room_complaints_serializer(complaint,context={'request':request})

            return Response(serializer.data,status=status.HTTP_202_ACCEPTED)

        except:

            return Response('ERROR', status=status.HTTP_400_BAD_REQUEST)


        



