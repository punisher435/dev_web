# Generated by Django 3.1.4 on 2021-02-24 04:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bookings', '0008_auto_20210223_1231'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='shop_rating_and_reviews',
            name='customer_id',
        ),
        migrations.RemoveField(
            model_name='shop_rating_and_reviews',
            name='shop_id',
        ),
        migrations.DeleteModel(
            name='apartment_rating_and_reviews',
        ),
        migrations.DeleteModel(
            name='shop_rating_and_reviews',
        ),
    ]
