from rest_framework import routers
from .views import UserViewSet, EntryViewSet, ChatViewSet

router = routers.DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'entries', EntryViewSet)
router.register(r'chat', ChatViewSet)