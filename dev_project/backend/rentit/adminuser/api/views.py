from rest_framework.generics import ListAPIView,RetrieveAPIView
from adminuser.models import admin_user
from .serializers import admin_user_serializer

class admin_user_list_view(ListAPIView):
    queryset = admin_user.objects.all()
    serializer_class=admin_user_serializer

class admin_user_detail_view(RetrieveAPIView):
    queryset = admin_user.objects.all()
    serializer_class=admin_user_serializer