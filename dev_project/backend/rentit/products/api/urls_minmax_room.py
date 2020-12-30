from rest_framework.routers import DefaultRouter

from .views import minmax_room_viewset 

router = DefaultRouter()
router.register(r'minmax_room', minmax_room_viewset , basename='minmax_room')
urlpatterns = router.urls 