from rest_framework.routers import DefaultRouter

from .views import Coupon_give
router = DefaultRouter()
router.register(r'coupon/give', Coupon_give, basename='mycoupons')
urlpatterns = router.urls