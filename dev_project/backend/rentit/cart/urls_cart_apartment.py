from rest_framework.routers import DefaultRouter

from .views import cart_apartment

router = DefaultRouter()
router.register(r'cart/apartments', cart_apartment, basename='cart/apartments')
urlpatterns = router.urls 