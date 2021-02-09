# Generated by Django 3.1.4 on 2021-02-05 12:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('bookings', '0001_initial'),
        ('products', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='roombookings',
            name='customer_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='room_customer_id', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='roombookings',
            name='room_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='booked_room_id', to='products.rooms'),
        ),
        migrations.AddField(
            model_name='roombookings',
            name='seller_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='room_seller_id', to=settings.AUTH_USER_MODEL),
        ),
    ]
