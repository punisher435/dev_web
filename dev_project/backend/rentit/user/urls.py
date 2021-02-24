from rest_framework.routers import DefaultRouter

from .views import seller_reviews

router = DefaultRouter()
router.register(r'seller/reviews',seller_reviews , basename='seller_reviews')
urlpatterns = router.urls 