from django.conf import settings
from rest_framework.views import APIView
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from rest_framework.permissions import (IsAuthenticated, AllowAny)

from authentication.models import UserSettings
from authentication.serializers import UserSettingsSerializer

from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == 200:
            access_token = response.data.get('access')
            refresh_token = response.data.get('refresh')
            
            response.set_cookie(
                'access',
                access_token,
                max_age=settings.AUTH_COOKIE_ACCESS_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )
            
            response.set_cookie(
                'refresh',
                access_token,
                max_age=settings.AUTH_COOKIE_ACCESS_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )
        
        return response

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get('refresh')
        
        if refresh_token:
            request.data['refresh'] = refresh_token
        
        response = super().post(request, *args, **kwargs)
        
        if response.status_code == 200:
            access_token = response.data.get('access')
            
            response.set_cookie(
                'access',
                access_token,
                max_age=settings.AUTH_COOKIE_ACCESS_MAX_AGE,
                path=settings.AUTH_COOKIE_PATH,
                secure=settings.AUTH_COOKIE_SECURE,
                httponly=settings.AUTH_COOKIE_HTTP_ONLY,
                samesite=settings.AUTH_COOKIE_SAMESITE
            )
        
        return response

class CustomTokenVerifyView(TokenVerifyView):
    def post(self, request, *args, **kwargs):
        access_token = request.COOKIES.get('access')
        
        if access_token:
            request.data['token'] = access_token
        
        return super().post(request, *args, **kwargs)

class LogoutView(APIView):
    def post(self, request):
        response = Response(status=status.HTTP_204_NO_CONTENT)
        response.delete_cookie('access')
        response.delete_cookie('refresh')
        
        return response

class UserSettingsView(viewsets.ModelViewSet):
    serializer_class = UserSettingsSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    
    def get(self, request, *args, **kwargs):
        try:
            user_settings = UserSettings.objects.get(user=request.user)
            serializer = UserSettingsSerializer(user_settings)
            return Response(serializer.data)
        except UserSettings.DoesNotExist:
            return Response({"detail": "Impostazioni utente non trovate."}, status=status.HTTP_404_NOT_FOUND)

    def put(self, request, *args, **kwargs):
        try:
            user_settings = UserSettings.objects.get(user=request.user)
            
            # Gestisci sia i dati JSON che i dati del form
            data = request.data.copy()
            profile_picture = request.FILES.get('profile_picture')
            if profile_picture:
                data['profile_picture'] = profile_picture

            serializer = UserSettingsSerializer(user_settings, data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except UserSettings.DoesNotExist:
            return Response({"detail": "Impostazioni utente non trovate."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        serializer = UserSettingsSerializer(data=request.data)
        if serializer.is_valid():
            # Gestione del caricamento dell'immagine
            immagine = request.FILES.get('profile_picture')
            if immagine:
                # Assicurati che il campo 'immagine' esista nel modello UserSettings
                serializer.validated_data['profile_picture'] = immagine
            
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, *args, **kwargs):
        try:
            user_settings = UserSettings.objects.get(user=request.user)
            serializer = UserSettingsSerializer(user_settings, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except UserSettings.DoesNotExist:
            return Response({"detail": "Impostazioni utente non trovate."}, status=status.HTTP_404_NOT_FOUND)

