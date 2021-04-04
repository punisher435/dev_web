from rest_framework.routers import DefaultRouter

from .views import shop_complaint

router = DefaultRouter()
router.register(r'complaints/shop', shop_complaint, basename='shop_complaints')
urlpatterns = router.urls 