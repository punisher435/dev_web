from rest_framework.routers import DefaultRouter

from .views_location import room_location_viewset 

router = DefaultRouter()
router.register(r'rooms/location',room_location_viewset , basename='room_location')
urlpatterns = router.urls 