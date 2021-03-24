from rest_framework.routers import DefaultRouter

from .views import admin_seller


router = DefaultRouter()
router.register(r'admin_me/seller', admin_seller, basename='adminme_seller')
urlpatterns = router.urls 