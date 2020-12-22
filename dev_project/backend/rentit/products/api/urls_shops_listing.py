from rest_framework.routers import DefaultRouter

from .views import shop_viewset 

router = DefaultRouter()
router.register(r'shops', shop_viewset, basename='shops')
urlpatterns = router.urls 