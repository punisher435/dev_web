from rest_framework.generics import ListAPIView,RetrieveAPIView
from customer.models import customer,customer_details
from .serializers import customer_serializer,customer_details_serializer

class customer_list_view(ListAPIView):
    queryset = customer.objects.all()
    serializer_class=customer_serializer

class customer_detail_view(RetrieveAPIView):
    queryset = customer.objects.all()
    serializer_class=customer_serializer

class customer_details_list_view(ListAPIView):
    queryset = customer_details.objects.all()
    serializer_class=customer_details_serializer

class customer_details_detail_view(RetrieveAPIView):
    queryset = customer_details.objects.all()
    serializer_class=customer_details_serializer