from rest_framework.routers import DefaultRouter

from .views import room_booking

router = DefaultRouter()
router.register(r'book', room_booking, basename='room_booking')
urlpatterns = router.urls 