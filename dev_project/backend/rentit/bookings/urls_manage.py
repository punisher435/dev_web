from rest_framework.routers import DefaultRouter

from .views_manage import room_payment


router = DefaultRouter()
router.register(r'payment', room_payment, basename='room_booking_payment')
urlpatterns = router.urls 