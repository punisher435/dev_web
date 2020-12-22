from rest_framework.routers import DefaultRouter

from .views import my_shop_viewset 

router = DefaultRouter()
router.register(r'my_shops', my_shop_viewset, basename='my_shops')
urlpatterns = router.urls 