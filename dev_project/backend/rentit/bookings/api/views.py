from rest_framework.generics import ListAPIView,RetrieveAPIView
from bookings.models import room_bookings,room_bookings_history,shop_bookings,shop_bookings_history,apartment_bookings,apartment_bookings_history
from .serializers import room_bookings_serializer,room_bookings_history_serializer,shop_bookings_serializer,shop_bookings_history_serializer,apartment_bookings_serializer,apartment_bookings_history_serializer

class room_bookings_list_view(ListAPIView):
    queryset = room_bookings.objects.all()
    serializer_class=room_bookings_serializer

class room_bookings_detail_view(RetrieveAPIView):
    queryset = room_bookings.objects.all()
    serializer_class=room_bookings_serializer

class room_bookings_history_list_view(ListAPIView):
    queryset = room_bookings_history.objects.all()
    serializer_class=room_bookings_history_serializer

class room_bookings_history_detail_view(RetrieveAPIView):
    queryset = room_bookings_history.objects.all()
    serializer_class=room_bookings_history_serializer

class shop_bookings_list_view(ListAPIView):
    queryset = shop_bookings.objects.all()
    serializer_class=shop_bookings_serializer

class shop_bookings_detail_view(RetrieveAPIView):
    queryset = shop_bookings.objects.all()
    serializer_class=shop_bookings_serializer

class shop_bookings_history_list_view(ListAPIView):
    queryset = shop_bookings_history.objects.all()
    serializer_class=shop_bookings_history_serializer

class shop_bookings_history_detail_view(RetrieveAPIView):
    queryset = shop_bookings_history.objects.all()
    serializer_class=shop_bookings_history_serializer

class apartment_bookings_list_view(ListAPIView):
    queryset = apartment_bookings.objects.all()
    serializer_class=apartment_bookings_serializer

class apartment_bookings_detail_view(RetrieveAPIView):
    queryset = apartment_bookings.objects.all()
    serializer_class=apartment_bookings_serializer

class apartment_bookings_history_list_view(ListAPIView):
    queryset = apartment_bookings_history.objects.all()
    serializer_class=apartment_bookings_history_serializer

class apartment_bookings_history_detail_view(RetrieveAPIView):
    queryset = apartment_bookings_history.objects.all()
    serializer_class=apartment_bookings_history_serializer