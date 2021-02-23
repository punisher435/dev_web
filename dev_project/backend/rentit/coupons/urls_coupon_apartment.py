from rest_framework.routers import DefaultRouter

from .views import Apply_coupon_apartment


router = DefaultRouter()
router.register(r'coupon/apartment/apply',Apply_coupon_apartment, basename='mycoupons')
urlpatterns = router.urls