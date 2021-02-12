from rest_framework.routers import DefaultRouter

from .views import coupon_viewset

router = DefaultRouter()
router.register(r'mycoupons', coupon_viewset, basename='mycoupons')
urlpatterns = router.urls