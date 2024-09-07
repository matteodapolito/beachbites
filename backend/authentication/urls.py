from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from .views import (
    CustomTokenObtainPairView,
    CustomTokenRefreshView,
    CustomTokenVerifyView,
    LogoutView,
    UserSettingsView
)

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/jwt/create/', CustomTokenObtainPairView.as_view()),
    path('auth/jwt/refresh/', CustomTokenRefreshView.as_view()),
    path('auth/jwt/verify/', CustomTokenVerifyView.as_view()),
    path('auth/logout/', LogoutView.as_view()),
    path('auth/user-settings/', UserSettingsView.as_view({
        'get': 'get',
        'post': 'post',
        'put': 'put',
        'patch': 'patch'
    }), name='user-settings')] 
