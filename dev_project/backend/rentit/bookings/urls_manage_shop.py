from rest_framework.routers import DefaultRouter

from .views_manage import shop_payment


router = DefaultRouter()
router.register(r'shop/book/payment', shop_payment, basename='shop_booking_payment')
urlpatterns = router.urls 