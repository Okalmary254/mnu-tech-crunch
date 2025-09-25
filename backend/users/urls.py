import http
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, LoginView, RegisterView, LoginFormView, LogoutFormView
from django.urls import path

router = DefaultRouter()
router.register(r'users', UserViewSet)

urlpatterns = [
	path('auth/login/', LoginView.as_view(), name='login'),
	path('auth/login/form/', LoginFormView.as_view(), name='login_form'),
	path('auth/logout/form/', LogoutFormView.as_view(), name='logout_form'),
	path('auth/register/', RegisterView.as_view(), name='register'),
]
urlpatterns += router.urls