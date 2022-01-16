from django.contrib import admin
from django.conf.urls import include
from django.urls import path
from api.urls import router as api_router

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(api_router.urls))
]