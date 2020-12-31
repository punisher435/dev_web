from rest_framework.routers import DefaultRouter

from .views import minmax_shop_viewset 

router = DefaultRouter()
router.register(r'minmax_shop', minmax_shop_viewset , basename='minmax_shop')
urlpatterns = router.urls 