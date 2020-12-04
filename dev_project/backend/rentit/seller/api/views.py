from rest_framework.generics import ListAPIView,RetrieveAPIView
from seller.models import seller,seller_details
from .serializers import seller_serializer,seller_details_serializer

class seller_list_view(ListAPIView):
    queryset = seller.objects.all()
    serializer_class=seller_serializer

class seller_detail_view(RetrieveAPIView):
    queryset = seller.objects.all()
    serializer_class=seller_serializer

class seller_details_list_view(ListAPIView):
    queryset = seller_details.objects.all()
    serializer_class=seller_details_serializer

class seller_details_detail_view(RetrieveAPIView):
    queryset = seller_details.objects.all()
    serializer_class=seller_details_serializer