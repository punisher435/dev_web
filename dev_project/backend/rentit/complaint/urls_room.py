from rest_framework.routers import DefaultRouter

from .views import room_complaint

router = DefaultRouter()
router.register(r'complaints/room', room_complaint, basename='room_complaints')
urlpatterns = router.urls 