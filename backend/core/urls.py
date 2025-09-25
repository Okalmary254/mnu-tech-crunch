import http
from django.contrib import admin
from django.urls import path, include
from .views import home
from .frontend import FrontendAppView

urlpatterns = [
    path('', home, name='home'),
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/', include('posts.urls')),
]

# Catch-all for React frontend routes

from django.conf import settings
from django.conf.urls.static import static
from django.urls import re_path
urlpatterns += [
    re_path(r'^(?:.*)/?$', FrontendAppView.as_view()),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
