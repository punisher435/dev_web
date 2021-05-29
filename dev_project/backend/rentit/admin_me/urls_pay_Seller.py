from rest_framework.routers import DefaultRouter

from .views import Seller_pay


router = DefaultRouter()
router.register(r'seller/admin_pay', Seller_pay, basename='admin_seller_pay')
urlpatterns = router.urls 