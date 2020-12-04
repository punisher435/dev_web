from rest_framework.generics import ListAPIView,RetrieveAPIView
from products.models import rooms,room_facility,room_rating_and_reviews,shops,shop_facility,shop_rating_and_reviews,apartments,apartment_facility,apartment_rating_and_reviews
from .serializers import shops_serializer,shop_facility_serializer,shop_rating_and_reviews_serializer
from .serializers import rooms_serializer,room_facility_serializer,room_rating_and_reviews_serializer
from .serializers import apartments_serializer,apartment_facility_serializer,apartment_rating_and_reviews_serializer

#rooms
class rooms_list_view(ListAPIView):
    queryset = rooms.objects.all()
    serializer_class=rooms_serializer

class rooms_detail_view(RetrieveAPIView):
    queryset = rooms.objects.all()
    serializer_class=rooms_serializer

class room_facility_list_view(ListAPIView):
    queryset = room_facility.objects.all()
    serializer_class=room_facility_serializer

class room_facility_detail_view(RetrieveAPIView):
    queryset = room_facility.objects.all()
    serializer_class=room_facility_serializer

class room_rating_and_reviews_list_view(ListAPIView):
    queryset = room_rating_and_reviews.objects.all()
    serializer_class=room_rating_and_reviews_serializer

class room_rating_and_reviews_detail_view(RetrieveAPIView):
    queryset = room_rating_and_reviews.objects.all()
    serializer_class=room_rating_and_reviews_serializer

#shops


class shops_list_view(ListAPIView):
    queryset = shops.objects.all()
    serializer_class=shops_serializer

class shops_detail_view(RetrieveAPIView):
    queryset = shops.objects.all()
    serializer_class=shops_serializer

class shop_facility_list_view(ListAPIView):
    queryset = shop_facility.objects.all()
    serializer_class=shop_facility_serializer

class shop_facility_detail_view(RetrieveAPIView):
    queryset = shop_facility.objects.all()
    serializer_class=shop_facility_serializer

class shop_rating_and_reviews_list_view(ListAPIView):
    queryset = shop_rating_and_reviews.objects.all()
    serializer_class=shop_rating_and_reviews_serializer

class shop_rating_and_reviews_detail_view(RetrieveAPIView):
    queryset = shop_rating_and_reviews.objects.all()
    serializer_class=shop_rating_and_reviews_serializer

#apartments 


class apartments_list_view(ListAPIView):
    queryset = apartments.objects.all()
    serializer_class=apartments_serializer

class apartments_detail_view(RetrieveAPIView):
    queryset = apartments.objects.all()
    serializer_class=apartments_serializer

class apartment_facility_list_view(ListAPIView):
    queryset = apartment_facility.objects.all()
    serializer_class=apartment_facility_serializer

class apartment_facility_detail_view(RetrieveAPIView):
    queryset = apartment_facility.objects.all()
    serializer_class=apartment_facility_serializer

class apartment_rating_and_reviews_list_view(ListAPIView):
    queryset = apartment_rating_and_reviews.objects.all()
    serializer_class=apartment_rating_and_reviews_serializer

class apartment_rating_and_reviews_detail_view(RetrieveAPIView):
    queryset = apartment_rating_and_reviews.objects.all()
    serializer_class=apartment_rating_and_reviews_serializer