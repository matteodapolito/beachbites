from django.contrib.auth import get_user_model
from rest_framework.response import Response
from rest_framework import viewsets, status
from authentication.serializers import UserSerializer
from .models import Allergene, Categoria, Ordine, ElementoOrdine, Prodotto
from .serializers import AllergeneSerializer, CategoriaSerializer, OrdineSerializer, ElementoOrdineSerializer, ProdottoSerializer
from rest_framework.permissions import (AllowAny,IsAuthenticated)



class OrdineViewSet(viewsets.ModelViewSet):
    queryset = Ordine.objects.all()
    serializer_class = OrdineSerializer
    permission_classes = [IsAuthenticated]
    
    def get_permissions(self):
        if self.action == 'create':
            return [AllowAny()]
        return super().get_permissions()

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['include_details'] = True
        return context

    def list(self, request, *args, **kwargs):
        ordini = self.queryset.all()
        serializer = self.get_serializer(ordini, many=True)
        
        detailed_data = []
        for ordine_data in serializer.data:
            detailed_ordine = self._get_detailed_ordine(ordine_data)
            detailed_data.append(detailed_ordine)
        
        return Response(detailed_data, status=status.HTTP_200_OK)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        detailed_ordine = self._get_detailed_ordine(serializer.data)
        return Response(detailed_ordine)

    def _get_detailed_ordine(self, ordine_data):
        elementi_dettagliati = []
        for elemento in ordine_data['elementi']:
            prodotto = Prodotto.objects.get(pk=elemento['prodotto'])
            prodotto_serializer = ProdottoSerializer(prodotto)
            elemento['prodotto'] = prodotto_serializer.data
            elementi_dettagliati.append(elemento)
        
        ordine_data['elementi'] = elementi_dettagliati
        return ordine_data

    def create(self, request, *args, **kwargs):
        ordine_data = request.data
        elementi_data = ordine_data.pop('elementi', [])
        
        ordine_serializer = self.get_serializer(data=ordine_data)
        ordine_serializer.is_valid(raise_exception=True)
        # ordine = self.perform_create(ordine_serializer)
        ordine = ordine_serializer.save()
        
        for elemento_data in elementi_data:
            prodotto = Prodotto.objects.get(pk=elemento_data['prodotto'])
            ElementoOrdine.objects.create(
                ordine=ordine,
                prodotto=prodotto,
                quantita=elemento_data['quantita']
            )

        return Response(ordine_serializer.data, status=status.HTTP_201_CREATED)
    
    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            self.perform_update(serializer)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        try:
            instance.delete()
            return Response({"message": "Ordine eliminato con successo"}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": f"Impossibile eliminare l'ordine: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)

class ProdottoViewSet(viewsets.ModelViewSet):
    queryset = Prodotto.objects.all()
    serializer_class = ProdottoSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        prodotti = Prodotto.objects.all()
        serializer = self.get_serializer(prodotti, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def retrieve(self, request, *args, **kwargs):
        try:
            prodotto = Prodotto.objects.get(pk=kwargs['pk'])
            serializer = self.get_serializer(prodotto)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Prodotto.DoesNotExist:
            return Response({"error": "Prodotto non trovato"}, status=status.HTTP_404_NOT_FOUND)
    
    def update(self, request, *args, **kwargs):
        try:
            prodotto = Prodotto.objects.get(pk=kwargs['pk'])
            serializer = self.get_serializer(prodotto, data=request.data, partial=False)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Prodotto.DoesNotExist:
            return Response({"error": "Prodotto non trovato"}, status=status.HTTP_404_NOT_FOUND)

    def partial_update(self, request, *args, **kwargs):
        try:
            prodotto = Prodotto.objects.get(pk=kwargs['pk'])
            serializer = self.get_serializer(prodotto, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Prodotto.DoesNotExist:
            return Response({"error": "Prodotto non trovato"}, status=status.HTTP_404_NOT_FOUND)

    def destroy(self, request, *args, **kwargs):
        try:
            prodotto = Prodotto.objects.get(pk=kwargs['pk'])
            prodotto.delete()
            return Response({"message": "Prodotto eliminato con successo"}, status=status.HTTP_204_NO_CONTENT)
        except Prodotto.DoesNotExist:
            return Response({"error": "Prodotto non trovato"}, status=status.HTTP_404_NOT_FOUND)

    def prodotti_per_categoria(self, request, categoria_id):
        try:
            categoria = Categoria.objects.get(pk=categoria_id)
            prodotti = Prodotto.objects.filter(categoria=categoria)
            serializer = self.get_serializer(prodotti, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Categoria.DoesNotExist:
            return Response({"error": "Categoria non trovata"}, status=status.HTTP_404_NOT_FOUND)

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request, *args, **kwargs):
        categorie = Categoria.objects.all()
        serializer = self.get_serializer(categorie, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AllergeneViewSet(viewsets.ModelViewSet):
    queryset = Allergene.objects.all()
    serializer_class = AllergeneSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request, *args, **kwargs):
        allergeni = Allergene.objects.all()
        serializer = self.get_serializer(allergeni, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
