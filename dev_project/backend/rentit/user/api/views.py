from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework_simplejwt import authentication
from rest_framework import status
from rest_framework.parsers import MultiPartParser,FormParser

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
            serializer = profile_serializer(data=request.data,context={'request':request})
            if serializer.is_valid(raise_exception=True):
                serializer.validated_data["user_id"]=request.user
                serializer.save()
                USER=User.objects.get(email=request.user)
                USER.profile_completed=True
                USER.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors,status=status.HTTP_406_NOT_ACCEPTABLE)
        except:
            return Response('ERROR',status=status.HTTP_400_BAD_REQUEST)

    def update(self,request,pk=None,format=None):
        try:
            queryset = customUser_profile.objects.get_user_profile(request.user)
            profile= get_object_or_404(queryset,pk=pk)
            serializer = profile_serializer(data=request.data,partial=True)
            if serializer.is_valid(raise_exception=True):
                if profile.mobile!=serializer.validated_data["mobile"]: 
                    profile.mobile=serializer.validated_data["mobile"]
                if profile.aadhar!=serializer.validated_data["aadhar"]:
                    profile.aadhar=serializer.validated_data["aadhar"]
                if profile.country_code!=serializer.validated_data["country_code"]:
                    profile.country_code=serializer.validated_data["country_code"]
                if profile.alternate_mobile!=serializer.validated_data["alternate_mobile"]:
                    profile.alternate_mobile=serializer.validated_data["alternate_mobile"]
                if profile.photo!=serializer.validated_data["photo"]:
                    profile.photo=serializer.validated_data["photo"]
                profile.save()
                serializer = profile_serializer(profile,context={'request':request})
                return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
            else:
                return Response(serializer.errors,status=status.HTTP_406_NOT_ACCEPTABLE)
        except:
            return Response('ERROR',status=status.HTTP_400_BAD_REQUEST)


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
            serializer = seller_bank_serializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.validated_data["user_id"]=request.user
                serializer.save()
                USER=User.objects.get(email=request.user)
                USER.bank_completed=True
                USER.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors,status=status.HTTP_406_NOT_ACCEPTABLE)
        except:
            return Response('ERROR',status=status.HTTP_400_BAD_REQUEST)

    def update(self,request,pk=None):
        try:
            queryset = seller_bank_details.objects.all()
            queryset = queryset.filter(user_id=request.user)
            profile= get_object_or_404(queryset,pk=pk)
            serializer = seller_bank_serializer(data=request.data,partial=True)
            if serializer.is_valid(raise_exception=True):
                if profile.account_no!=serializer.validated_data["account_no"]: 
                    profile.account_no=serializer.validated_data["account_no"]
                if profile.bank_name!=serializer.validated_data["bank_name"]:
                    profile.bank_name=serializer.validated_data["bank_name"]
                if profile.bank_address!=serializer.validated_data["bank_address"]:
                    profile.bank_address=serializer.validated_data["bank_address"]
                if profile.IFSC_code!=serializer.validated_data["IFSC_code"]:
                    profile.IFSC_code=serializer.validated_data["IFSC_code"]
                if profile.account_type!=serializer.validated_data["account_type"]:
                    profile.account_type=serializer.validated_data["account_type"]
                if profile.total_due_payment!=serializer.validated_data["total_due_payment"]:
                    profile.total_due_payment=serializer.validated_data["total_due_payment"]
                profile.save()
                serializer = profile_serializer(profile)
                return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
            else:
                return Response(serializer.errors,status=status.HTTP_406_NOT_ACCEPTABLE)
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
            serializer = seller_address_serializer(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.validated_data["user_id"]=request.user
                serializer.save()
                USER=User.objects.get(email=request.user)
                USER.address_completed=True
                USER.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors,status=status.HTTP_406_NOT_ACCEPTABLE)
        except:
            return Response('ERROR',status=status.HTTP_400_BAD_REQUEST)

    def update(self,request,pk=None):
        try:
            queryset = seller_address.objects.all()
            queryset = queryset.filter(user_id=request.user)
            profile= get_object_or_404(queryset,pk=pk)
            serializer = seller_address_serializer(data=request.data,partial=True)
            if serializer.is_valid(raise_exception=True):
                if profile.address!=serializer.validated_data["address"]: 
                    profile.address=serializer.validated_data["address"]
                if profile.city!=serializer.validated_data["city"]:
                    profile.city=serializer.validated_data["city"]
                if profile.state!=serializer.validated_data["state"]:
                    profile.state=serializer.validated_data["state"]
                if profile.country!=serializer.validated_data["country"]:
                    profile.country=serializer.validated_data["country"]
                if profile.pincode!=serializer.validated_data["pincode"]:
                    profile.pincode=serializer.validated_data["pincode"]
                if profile.landmark!=serializer.validated_data["landmark"]:
                    profile.landmark=serializer.validated_data["landmark"]
                if profile.longitude!=serializer.validated_data["longitude"]:
                    profile.longitude=serializer.validated_data["longitude"]
                if profile.latitude!=serializer.validated_data["latitude"]:
                    profile.latitude=serializer.validated_data["latitude"]

                profile.save()
                serializer = profile_serializer(profile)
                return Response(serializer.data,status=status.HTTP_202_ACCEPTED)
            else:
                return Response(serializer.errors,status=status.HTTP_406_NOT_ACCEPTABLE)
        except:
            return Response('ERROR',status=status.HTTP_400_BAD_REQUEST)
            

            
       

            
