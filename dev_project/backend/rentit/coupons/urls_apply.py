from rest_framework.routers import DefaultRouter

from .views import Apply_coupon

router = DefaultRouter()
router.register(r'coupon/apply',Apply_coupon, basename='applycoupons')
urlpatterns = router.urls