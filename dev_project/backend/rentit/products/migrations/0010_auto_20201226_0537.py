# Generated by Django 3.1.4 on 2020-12-26 05:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0009_auto_20201226_0537'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room_rating_and_reviews',
            name='rating',
            field=models.DecimalField(decimal_places=1, max_digits=3),
        ),
    ]
