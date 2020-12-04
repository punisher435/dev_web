from rest_framework.generics import ListAPIView,RetrieveAPIView
from cartandwish.models import cart,wishlist
from .serializers import cart_serializer,wishlist_serializer

class cart_list_view(ListAPIView):
    queryset = cart.objects.all()
    serializer_class=cart_serializer

class cart_detail_view(RetrieveAPIView):
    queryset = cart.objects.all()
    serializer_class=cart_serializer

class wishlist_list_view(ListAPIView):
    queryset = wishlist.objects.all()
    serializer_class=wishlist_serializer

class wishlist_detail_view(RetrieveAPIView):
    queryset = wishlist.objects.all()
    serializer_class=wishlist_serializer