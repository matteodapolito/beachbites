# Generated by Django 5.0.7 on 2024-09-03 09:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ordini', '0005_remove_ordine_email_cliente_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ordine',
            name='totale',
        ),
    ]
