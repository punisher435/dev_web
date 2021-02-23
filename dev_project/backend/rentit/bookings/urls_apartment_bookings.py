from rest_framework.routers import DefaultRouter

from .views import apartment_booking

router = DefaultRouter()
router.register(r'apartment/book', apartment_booking, basename='apartment_booking')
urlpatterns = router.urls 