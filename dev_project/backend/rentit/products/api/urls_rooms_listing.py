from rest_framework.routers import DefaultRouter

from .views import room_viewset 

router = DefaultRouter()
router.register(r'rooms', room_viewset, basename='rooms')
urlpatterns = router.urls 