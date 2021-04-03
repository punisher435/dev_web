from rest_framework.routers import DefaultRouter

from .views import room_complaints

router = DefaultRouter()
router.register(r'complaints/room', room_complaints, basename='room_complaints')
urlpatterns = router.urls 