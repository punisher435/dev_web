from rest_framework.routers import DefaultRouter

from .views import admin_refresh


router = DefaultRouter()
router.register(r'admin_me/refresh',admin_refresh, basename='adminme_admin_refresh')
urlpatterns = router.urls 