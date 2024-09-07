from rest_framework import serializers
from .models import Allergene, Categoria, Ordine, ElementoOrdine, Prodotto

class ElementoOrdineSerializer(serializers.ModelSerializer):
    class Meta:
        model = ElementoOrdine
        fields = '__all__'

class OrdineSerializer(serializers.ModelSerializer):
    nome = serializers.CharField(required=True)
    cognome = serializers.CharField(required=True)
    elementi = ElementoOrdineSerializer(many=True, read_only=True)
    n_ombrellone = serializers.IntegerField(required=True)
    slot_delivery = serializers.TimeField(required=True)
    note = serializers.CharField(required=False)

    class Meta:
        model = Ordine
        fields = '__all__'

class ProdottoSerializer(serializers.ModelSerializer):
    categoria = serializers.PrimaryKeyRelatedField(queryset=Categoria.objects.all())
    allergeni = serializers.PrimaryKeyRelatedField(many=True, queryset=Allergene.objects.all())

    class Meta:
        model = Prodotto
        fields = ['id', 'nome', 'descrizione', 'immagine', 'prezzo', 'categoria', 'allergeni']

class AllergeneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Allergene
        fields = ['id', 'nome']

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ['id', 'nome']
