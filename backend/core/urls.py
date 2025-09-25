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
from django.urls import re_path
urlpatterns += [
    re_path(r'^(?:.*)/?$', FrontendAppView.as_view()),
]
