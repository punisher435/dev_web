# Generated by Django 3.1.4 on 2020-12-26 06:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0013_auto_20201226_0624'),
    ]

    operations = [
        migrations.AddField(
            model_name='apartments',
            name='reviews',
            field=models.DecimalField(decimal_places=1, default=0, max_digits=2),
        ),
        migrations.AddField(
            model_name='shops',
            name='reviews',
            field=models.DecimalField(decimal_places=1, default=0, max_digits=2),
        ),
    ]
