from rest_framework.routers import DefaultRouter

from .views_rating_and_reviews import shop_reviews 

router = DefaultRouter()
router.register(r'shop/reviews', shop_reviews, basename='shop_review')
urlpatterns = router.urls 