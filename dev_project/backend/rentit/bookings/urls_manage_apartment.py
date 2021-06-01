from rest_framework.routers import DefaultRouter

from .views_manage import apartment_payment


router = DefaultRouter()
router.register(r'payment', apartment_payment, basename='apartment_booking_payment')
urlpatterns = router.urls 