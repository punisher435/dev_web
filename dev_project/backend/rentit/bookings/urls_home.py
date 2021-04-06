from rest_framework.routers import DefaultRouter

from .viewhome import home_view

router = DefaultRouter()
router.register(r'booking', home_view, basename='home_view_booking')
urlpatterns = router.urls 