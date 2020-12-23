from rest_framework.routers import DefaultRouter

from .views_rating_and_reviews import room_reviews 

router = DefaultRouter()
router.register(r'room/reviews', room_reviews, basename='room_review')
urlpatterns = router.urls 