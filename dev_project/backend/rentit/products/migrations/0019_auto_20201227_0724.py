# Generated by Django 3.1.4 on 2020-12-27 07:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0018_auto_20201227_0611'),
    ]

    operations = [
        migrations.AddField(
            model_name='apartments',
            name='cart',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='apartments',
            name='wishlist',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='rooms',
            name='booked_by',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='shops',
            name='cart',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='shops',
            name='wishlist',
            field=models.BooleanField(default=False),
        ),
    ]
