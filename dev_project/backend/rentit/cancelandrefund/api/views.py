from rest_framework.generics import ListAPIView,RetrieveAPIView
from cancelandrefund.models import refund_room,refund_shop,refund_apartment
from .serializers import refund_room_serializer,refund_shop_serializer,refund_apartment_serializer
class refund_room_list_view(ListAPIView):
    queryset = refund_room.objects.all()
    serializer_class=refund_room_serializer

class refund_room_detail_view(RetrieveAPIView):
    queryset = refund_room.objects.all()
    serializer_class=refund_room_serializer

class refund_shop_list_view(ListAPIView):
    queryset = refund_shop.objects.all()
    serializer_class=refund_shop_serializer

class refund_shop_detail_view(RetrieveAPIView):
    queryset = refund_shop.objects.all()
    serializer_class=refund_shop_serializer

class refund_apartment_list_view(ListAPIView):
    queryset = refund_apartment.objects.all()
    serializer_class=refund_apartment_serializer

class refund_apartment_detail_view(RetrieveAPIView):
    queryset = refund_apartment.objects.all()
    serializer_class=refund_apartment_serializer