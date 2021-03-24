from rest_framework.routers import DefaultRouter

from .views import admin_room


router = DefaultRouter()
router.register(r'admin_me/room', admin_room, basename='adminme_room')
urlpatterns = router.urls 