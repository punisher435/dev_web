from rest_framework.routers import DefaultRouter

from .views import get_message

router = DefaultRouter()
router.register(r'complaints/messages', get_message, basename='get_messages')
urlpatterns = router.urls 