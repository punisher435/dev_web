from rest_framework.generics import ListAPIView,RetrieveAPIView
from paylater.models import paylater_request,paylater
from .serializers import paylater_request_serializer,paylater_serializer

class paylater_request_list_view(ListAPIView):
    queryset = paylater_request.objects.all()
    serializer_class=paylater_request_serializer

class paylater_request_detail_view(RetrieveAPIView):
    queryset = paylater_request.objects.all()
    serializer_class=paylater_request_serializer

class paylater_list_view(ListAPIView):
    queryset = paylater.objects.all()
    serializer_class=paylater_serializer

class paylater_detail_view(RetrieveAPIView):
    queryset = paylater.objects.all()
    serializer_class=paylater_serializer