from rest_framework.routers import DefaultRouter

from .views import cart_room

router = DefaultRouter()
router.register(r'cart/rooms', cart_room, basename='cart/rooms')
urlpatterns = router.urls 