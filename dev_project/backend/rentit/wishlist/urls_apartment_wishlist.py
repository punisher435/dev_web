from rest_framework.routers import DefaultRouter

from .views import wishlist_apartment

router = DefaultRouter()
router.register(r'wishlist/apartments', wishlist_apartment, basename='wishlist/apartments')
urlpatterns = router.urls 