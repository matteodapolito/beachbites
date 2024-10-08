# Generated by Django 5.0.7 on 2024-09-05 18:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_usersettings'),
    ]

    operations = [
        migrations.AddField(
            model_name='usersettings',
            name='company_address',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='usersettings',
            name='company_name',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='usersettings',
            name='company_phone',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='usersettings',
            name='closing_time',
            field=models.TimeField(null=True),
        ),
        migrations.AlterField(
            model_name='usersettings',
            name='gps_coordinates',
            field=models.JSONField(default=list, null=True),
        ),
        migrations.AlterField(
            model_name='usersettings',
            name='opening_time',
            field=models.TimeField(null=True),
        ),
        migrations.AlterField(
            model_name='usersettings',
            name='umbrella_count',
            field=models.PositiveIntegerField(default=0, null=True),
        ),
    ]
