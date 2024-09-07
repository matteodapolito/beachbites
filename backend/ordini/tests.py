from django.test import TestCase
from decimal import Decimal
from .models import Categoria, Allergene, Prodotto, Ordine, ElementoOrdine

class ModelsTestCase(TestCase):
    def setUp(self):
        # Creazione di oggetti di test
        self.categoria = Categoria.objects.create(nome="Bevande")
        self.allergene = Allergene.objects.create(nome="Lattosio")
        self.prodotto = Prodotto.objects.create(
            nome="Cappuccino",
            descrizione="Caffè con latte montato",
            prezzo=Decimal("2.50"),
            categoria=self.categoria
        )
        self.prodotto.allergeni.add(self.allergene)
        self.ordine = Ordine.objects.create(
            nome="Mario",
            cognome="Rossi",
            n_ombrellone=5
        )
        self.elemento_ordine = ElementoOrdine.objects.create(
            ordine=self.ordine,
            prodotto=self.prodotto,
            quantita=2
        )

    def test_categoria_str(self):
        self.assertEqual(str(self.categoria), "Bevande")

    def test_allergene_str(self):
        self.assertEqual(str(self.allergene), "Lattosio")

    def test_prodotto_str(self):
        self.assertEqual(str(self.prodotto), "Cappuccino")

    def test_ordine_str(self):
        self.assertEqual(str(self.ordine), f"Ordine {self.ordine.id}")

    def test_elemento_ordine_str(self):
        self.assertEqual(str(self.elemento_ordine), "2 x Cappuccino")

    def test_elemento_ordine_prezzo_totale(self):
        self.assertEqual(self.elemento_ordine.prezzo_totale, Decimal("5.00"))

    def test_prodotto_categoria_relation(self):
        self.assertEqual(self.prodotto.categoria, self.categoria)

    def test_prodotto_allergeni_relation(self):
        self.assertIn(self.allergene, self.prodotto.allergeni.all())

    def test_ordine_elementi_relation(self):
        self.assertIn(self.elemento_ordine, self.ordine.elementi.all())
