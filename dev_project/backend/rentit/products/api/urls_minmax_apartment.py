from rest_framework.routers import DefaultRouter

from .views import minmax_apartment_viewset 

router = DefaultRouter()
router.register(r'minmax_apartment', minmax_apartment_viewset , basename='minmax_apartment')
urlpatterns = router.urls 