# Generated by Django 5.0.7 on 2024-09-03 00:03

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserSettings',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('umbrella_count', models.PositiveIntegerField(default=0)),
                ('gps_coordinates', models.JSONField(default=list)),
                ('opening_time', models.TimeField()),
                ('closing_time', models.TimeField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='settings', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
