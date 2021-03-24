from rest_framework.routers import DefaultRouter

from .views import admin_booking


router = DefaultRouter()
router.register(r'admin_me/booking', admin_booking, basename='adminme_booking')
urlpatterns = router.urls 