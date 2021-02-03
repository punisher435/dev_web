from rest_framework.routers import DefaultRouter

from .views import wishlist_shop

router = DefaultRouter()
router.register(r'wishlist/shops', wishlist_shop, basename='wishlist/shops')
urlpatterns = router.urls 