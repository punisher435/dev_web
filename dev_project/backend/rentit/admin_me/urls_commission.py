from rest_framework.routers import DefaultRouter

from .views import admin_commission


router = DefaultRouter()
router.register(r'admin_me/commission', admin_commission, basename='adminme_admin_commission')
urlpatterns = router.urls 