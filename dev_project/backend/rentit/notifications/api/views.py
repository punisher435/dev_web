from rest_framework.generics import ListAPIView,RetrieveAPIView
from notifications.models import notifications_admin,notifications_customer,notifications_seller
from .serializers import notifications_customer_serializer,notifications_seller_serializer,notifications_admin_serializer

class notifications_admin_list_view(ListAPIView):
    queryset = notifications_admin.objects.all()
    serializer_class=notifications_admin_serializer

class notifications_admin_detail_view(RetrieveAPIView):
    queryset = notifications_admin.objects.all()
    serializer_class=notifications_admin_serializer

class notifications_customer_list_view(ListAPIView):
    queryset = notifications_customer.objects.all()
    serializer_class=notifications_customer_serializer

class notifications_customer_detail_view(RetrieveAPIView):
    queryset = notifications_customer.objects.all()
    serializer_class=notifications_customer_serializer

class notifications_seller_list_view(ListAPIView):
    queryset = notifications_seller.objects.all()
    serializer_class=notifications_seller_serializer

class notifications_seller_detail_view(RetrieveAPIView):
    queryset = notifications_seller.objects.all()
    serializer_class=notifications_seller_serializer