from rest_framework.routers import DefaultRouter

from .views_rating_and_reviews import apartment_reviews 

router = DefaultRouter()
router.register(r'apartment/reviews', apartment_reviews, basename='apartment_review')
urlpatterns = router.urls