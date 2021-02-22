from rest_framework.routers import DefaultRouter

from .views_location import apartment_location_viewset 

router = DefaultRouter()
router.register(r'apartments/location',apartment_location_viewset , basename='apartment_location')
urlpatterns = router.urls 