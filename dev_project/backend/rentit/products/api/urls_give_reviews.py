from rest_framework.routers import DefaultRouter

from .views_rating_and_reviews import give_reviews

router = DefaultRouter()
router.register(r'reviews',give_reviews , basename='post_reviews')
urlpatterns = router.urls 