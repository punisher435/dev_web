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



from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.csrf import csrf_protect
from django.utils.decorators import method_decorator





class home_view(viewsets.ViewSet):

    def list(self,request):
        x = len(roomBookings.objects.all().filter(paid=True))
        y = len(shopBookings.objects.all().filter(paid=True))
        z = len(apartmentBookings.objects.all().filter(paid=True))
        print(x)
        return Response(str(x+y+z),status=status.HTTP_200_OK)

