from rest_framework.routers import DefaultRouter

from .views import admin_fake_discount


router = DefaultRouter()
router.register(r'admin_me/temp_discount', admin_fake_discount, basename='adminme_admin_fake_discount')
urlpatterns = router.urls 