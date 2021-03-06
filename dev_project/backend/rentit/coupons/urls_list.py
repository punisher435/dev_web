from rest_framework.routers import DefaultRouter

from .views import coupon_list_viewset
router = DefaultRouter()
router.register(r'coupon/list', coupon_list_viewset, basename='list_coupons')
urlpatterns = router.urls