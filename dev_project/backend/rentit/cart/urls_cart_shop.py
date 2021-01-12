from rest_framework.routers import DefaultRouter

from .views import cart_shop

router = DefaultRouter()
router.register(r'cart/shops', cart_shop, basename='cart/shops')
urlpatterns = router.urls 