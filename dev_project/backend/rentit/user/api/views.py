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

from user.models import customUser_profile
from user.api.serializers import profile_serializer


class profile_viewset(viewsets.ViewSet):

    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)

    def list(self,request):
        queryset = customUser_profile.objects.get_user_profile(request.user)
        serializer = profile_serializer(queryset,many=True)
        return Response(serializer.data)

    def retrieve(self,request,pk=None):
        queryset = customUser_profile.objects.get_user_profile(request.user)
        profile= get_object_or_404(queryset,pk=pk)
        serializer = profile_serializer(profile)
        return Response(serializer.data)

    def create(self,request,format=None):
        serializer = profile_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.validated_data["user_id"]=request.user
            serializer.save()
            USER=User.objects.get(email=request.user)
            USER.profile_completed=True
            USER.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_406_NOT_ACCEPTABLE)

    def update(self,request,pk=None,format=None):
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
            serializer = profile_serializer(profile)
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_406_NOT_ACCEPTABLE)

            

            
       

            
