from rest_framework.routers import DefaultRouter

from .views import my_apartment_viewset 

router = DefaultRouter()
router.register(r'my_apartments', my_apartment_viewset, basename='my_apartments')
urlpatterns = router.urls 