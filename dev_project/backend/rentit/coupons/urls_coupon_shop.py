from rest_framework.routers import DefaultRouter

from .views import Apply_coupon_shop


router = DefaultRouter()
router.register(r'coupon/shop/apply',Apply_coupon_shop, basename='mycoupons')
urlpatterns = router.urls