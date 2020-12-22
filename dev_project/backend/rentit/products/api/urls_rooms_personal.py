from rest_framework.routers import DefaultRouter

from .views import my_room_viewset 

router = DefaultRouter()
router.register(r'my_rooms', my_room_viewset, basename='my_rooms')
urlpatterns = router.urls 