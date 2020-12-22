from rest_framework.routers import DefaultRouter

from .views import apartment_viewset 

router = DefaultRouter()
router.register(r'apartments', apartment_viewset, basename='apartments')
urlpatterns = router.urls 