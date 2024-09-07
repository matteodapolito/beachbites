from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AllergeneViewSet, CategoriaViewSet, OrdineViewSet, ProdottoViewSet

router = DefaultRouter()
router.register(r'ordini', OrdineViewSet, basename='ordine')

urlpatterns = [
    path('', include(router.urls)),
    path('prodotti/', ProdottoViewSet.as_view({'get': 'list', 'post': 'create'}), name='prodotto-list-create'),
    path('prodotti/<int:pk>/', ProdottoViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='prodotto-detail'),
    path('prodotti/categoria/<int:categoria_id>/', ProdottoViewSet.as_view({'get': 'prodotti_per_categoria'}), name='prodotti-per-categoria'),
    path('allergeni/', AllergeneViewSet.as_view({'get': 'get', 'post': 'create'}), name='allergene-list-create'),
    path('categorie/', CategoriaViewSet.as_view({'get': 'list', 'post': 'create'}), name='categoria-list-create'),
    path('ordini/', OrdineViewSet.as_view({'get': 'list', 'post': 'create'}), name='ordine-list-create'),
    path('ordini/<int:pk>/', OrdineViewSet.as_view({'get': 'retrieve', 'put': 'update', 'patch': 'partial_update', 'delete': 'destroy'}), name='ordine-detail'),
]
