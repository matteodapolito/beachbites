# Generated by Django 5.0.7 on 2024-09-03 08:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ordini', '0003_ordine_n_ombrellone_ordine_slot_delivery'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ordine',
            name='n_ombrellone',
            field=models.IntegerField(null=True),
        ),
    ]
