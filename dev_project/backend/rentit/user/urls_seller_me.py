from rest_framework.routers import DefaultRouter

from .views import seller_reviews_short

router = DefaultRouter()
router.register(r'seller/product/reviews',seller_reviews_short , basename='seller_reviews_short')
urlpatterns = router.urls 