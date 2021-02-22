from rest_framework.routers import DefaultRouter

from .views_location import shop_location_viewset 

router = DefaultRouter()
router.register(r'shops/location',shop_location_viewset , basename='shop_location')
urlpatterns = router.urls 