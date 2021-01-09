from rest_framework.routers import DefaultRouter

from .views import wishlist_room

router = DefaultRouter()
router.register(r'wishlist/rooms', wishlist_room, basename='wishlist/rooms')
urlpatterns = router.urls 