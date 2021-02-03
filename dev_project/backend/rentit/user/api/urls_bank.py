from rest_framework.routers import DefaultRouter

from .views import bank_viewset 

router = DefaultRouter()
router.register(r'my_bank_details', bank_viewset, basename='bank')
urlpatterns = router.urls 