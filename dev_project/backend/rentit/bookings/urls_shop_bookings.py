from rest_framework.routers import DefaultRouter

from .views import shop_booking

router = DefaultRouter()
router.register(r'shop/book', shop_booking, basename='shop_booking')
urlpatterns = router.urls 