from rest_framework.routers import DefaultRouter

from .views import admin_discount


router = DefaultRouter()
router.register(r'admin_me/discount', admin_discount, basename='adminme_admin_discount')
urlpatterns = router.urls 