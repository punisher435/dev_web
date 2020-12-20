from rest_framework.routers import DefaultRouter

from .views import profile_viewset 

router = DefaultRouter()
router.register(r'profile', profile_viewset, basename='profile')
urlpatterns = router.urls 