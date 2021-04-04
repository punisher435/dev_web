from rest_framework.routers import DefaultRouter

from .views import apartment_complaint

router = DefaultRouter()
router.register(r'complaints/apartment', apartment_complaint, basename='apartment_complaints')
urlpatterns = router.urls 