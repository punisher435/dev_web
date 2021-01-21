from rest_framework.routers import DefaultRouter

from .views import address_viewset 

router = DefaultRouter()
router.register(r'my_address', address_viewset, basename='address')
urlpatterns = router.urls 