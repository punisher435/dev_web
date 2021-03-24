from rest_framework.routers import DefaultRouter

from .views import admin_seller_commission


router = DefaultRouter()
router.register(r'admin_me/seller/commission', admin_seller_commission, basename='adminme_admin_seller_commission')
urlpatterns = router.urls 