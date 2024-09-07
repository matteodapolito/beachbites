from django.db import models

from authentication.models import UserAccount

class Categoria(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome

class Allergene(models.Model):
    nome = models.CharField(max_length=100)

    def __str__(self):
        return self.nome

class Prodotto(models.Model):
    nome = models.CharField(max_length=200)
    descrizione = models.TextField(blank=True)
    # immagine = models.ImageField(upload_to='prodotti/', blank=True, null=True, )
    immagine = models.CharField(max_length=200, blank=True, null=True)
    prezzo = models.DecimalField(max_digits=6, decimal_places=2)
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE, related_name='prodotti')
    allergeni = models.ManyToManyField(Allergene, blank=True)

    def __str__(self):
        return self.nome

class Ordine(models.Model):
    nome = models.CharField(max_length=200, null=True)
    cognome = models.CharField(max_length=200, null=True)
    data_ordine = models.DateTimeField(auto_now_add=True)
    n_ombrellone = models.IntegerField(null=True)
    slot_delivery = models.TimeField(null=True)
    note = models.CharField(max_length=200, null=True, default="")
    

    def __str__(self):
        return f'Ordine {self.id}'

class ElementoOrdine(models.Model):
    ordine = models.ForeignKey(Ordine, on_delete=models.CASCADE, related_name='elementi')
    prodotto = models.ForeignKey(Prodotto, on_delete=models.SET_NULL, null=True)
    quantita = models.PositiveIntegerField(default=1)
    prezzo_totale = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f'{self.quantita} x {self.prodotto.nome}'

    def save(self, *args, **kwargs):
        self.prezzo_totale = self.prodotto.prezzo * self.quantita
        super().save(*args, **kwargs)
