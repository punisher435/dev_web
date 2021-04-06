from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework_simplejwt import authentication
from rest_framework import status
from rest_framework.parsers import MultiPartParser,FormParser
import json

User=get_user_model()

from user.models import customUser_profile,seller_bank_details,seller_address
from user.api.serializers import profile_serializer,seller_address_serializer,seller_bank_serializer


class profile_viewset(viewsets.ViewSet):

    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)

    def list(self,request,format=None):
        try:
            queryset = customUser_profile.objects.get_user_profile(request.user)
            serializer = profile_serializer(queryset,context={'request':request},many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except:
            return Response('ERROR',status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self,request,pk=None,format=None):
        try:
            queryset = customUser_profile.objects.get_user_profile(request.user)
            profile= get_object_or_404(queryset,pk=pk)
            serializer = profile_serializer(profile,context={'request':request})
            return Response(serializer.data,status=status.HTTP_200_OK)
        except:
            return Response('ERROR',status=status.HTTP_400_BAD_REQUEST)

    def create(self,request,format=None):
        try:

            temp = None
            if request.data["photo"] != 'null':
                temp = request.data["photo"]

            profile = customUser_profile(user_id=request.user,mobile=request.data["mobile"],alternate_mobile=request.data["alternate_mobile"],
            aadhar=request.data["aadhar"],country_code=request.data["country_code"],photo=temp)

            profile.save()
            USER=User.objects.get(email=request.user)
            USER.profile_completed=True
            USER.save()
            
            return Response('success',status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(str(e),status=status.HTTP_400_BAD_REQUEST)

    def update(self,request,pk=None,*args,**kwargs):
        try:
            queryset = customUser_profile.objects.all()
            queryset = queryset.filter(user_id=request.user)
            profile = get_object_or_404(queryset,pk=pk)

            if request.data["photo"] != 'null':
                profile.photo = request.data['photo']

            profile.country_code = request.data["country_code"]
            profile.mobile = request.data["mobile"]
            profile.alternate_mobile = request.data["alternate_mobile"]
            profile.aadhar = request.data["aadhar"]

            profile.save()
            
            return Response('success',status=status.HTTP_201_CREATED)
        except Exception as e:
            
            return Response(str(e),status=status.HTTP_400_BAD_REQUEST)
        


class bank_viewset(viewsets.ViewSet):
    
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def list(self,request):
        try:
            queryset = seller_bank_details.objects.all()
            queryset = queryset.filter(user_id=request.user)
            serializer = seller_bank_serializer(queryset,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except:
            return Response('ERROR',status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self,request,pk=None):
        try:
            queryset = seller_bank_details.objects.all()
            queryset = queryset.filter(user_id=request.user)
            profile= get_object_or_404(queryset,pk=pk)
            serializer = seller_bank_serializer(profile)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except:
            return Response('ERROR',status=status.HTTP_400_BAD_REQUEST)

    def create(self,request):
        
        try:
        
            data = json.loads(request.body.decode('utf-8'))['data']
            bank = seller_bank_details(user_id=request.user,account_no=data['account_no'],bank_name=data['bank_name'],
            bank_address=data['bank_address'],IFSC_code=data['IFSC_code'],currency=data['currency'],account_type=data['account_type'])

            bank.save()
            USER=User.objects.get(email=request.user)
            USER.bank_completed=True
            USER.save()

            return Response('success',status=status.HTTP_200_OK)

        except:
            return Response('error',status=status.HTTP_400_BAD_REQUEST)
        

    def update(self,request,pk=None):
        try:
            queryset = seller_bank_details.objects.all()
            queryset = queryset.filter(user_id=request.user)
            bank = get_object_or_404(queryset,pk=pk)

            data = json.loads(request.body.decode('utf-8'))['data']

            bank.account_no = data['account_no']
            bank.bank_name = data["bank_name"]
            bank.bank_address = data["bank_address"]
            bank.account_type = data["account_type"]
            bank.IFSC_code = data["IFSC_code"]

            bank.save()
            
            return Response('success',status=status.HTTP_201_CREATED)
        except:
            return Response('ERROR',status=status.HTTP_400_BAD_REQUEST)
            


class address_viewset(viewsets.ViewSet):
    
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    def list(self,request):
        try:
            queryset = seller_address.objects.all()
            queryset = queryset.filter(user_id=request.user)
            serializer = seller_address_serializer(queryset,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except:
            return Response('ERROR',status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self,request,pk=None):
        try:
            queryset = seller_address.objects.all()
            queryset = queryset.filter(user_id=request.user)
            profile= get_object_or_404(queryset,pk=pk)
            serializer = seller_address_serializer(profile)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except:
            return Response('ERROR',status=status.HTTP_400_BAD_REQUEST)

    def create(self,request):
        try:
        
            data = json.loads(request.body.decode('utf-8'))['data']
            address = seller_address(user_id=request.user,address=data['address'],city=data['city'],
            state=data['state'],country=data['country'],landmark=data['landmark'],pincode=data['pincode'])

            address.save()
            USER=User.objects.get(email=request.user)
            USER.address_completed=True
            USER.save()

            return Response('success',status=status.HTTP_200_OK)

        except:
            return Response('ERROR',status=status.HTTP_400_BAD_REQUEST)

    def update(self,request,pk=None):
        try:
            queryset = seller_address.objects.all()
            queryset = queryset.filter(user_id=request.user)
            address = get_object_or_404(queryset,pk=pk)

            data = json.loads(request.body.decode('utf-8'))['data']

            address.address = data['address']
            address.city = data["city"]
            address.state = data["state"]
            address.pincode = data["pincode"]
            address.landmark = data["landmark"]

            address.save()
            
            return Response('success',status=status.HTTP_201_CREATED)
        except:
            return Response('ERROR',status=status.HTTP_400_BAD_REQUEST)
            

            
       

            
