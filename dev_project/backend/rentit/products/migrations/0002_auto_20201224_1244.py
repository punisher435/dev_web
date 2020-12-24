# Generated by Django 3.1.4 on 2020-12-24 12:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('products', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='shops',
            name='seller_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='shop_owner_id', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='shop_rating_and_reviews',
            name='customer_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='shop_customer', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='shop_rating_and_reviews',
            name='shop_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='shop', to='products.rooms'),
        ),
        migrations.AddField(
            model_name='rooms',
            name='seller_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='room_owner_id', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='room_rating_and_reviews',
            name='customer_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='room_customer', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='room_rating_and_reviews',
            name='room_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='room', to='products.rooms'),
        ),
        migrations.AddField(
            model_name='apartments',
            name='seller_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='apartment_owner_id', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='apartment_rating_and_reviews',
            name='apartment_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='apartment', to='products.rooms'),
        ),
        migrations.AddField(
            model_name='apartment_rating_and_reviews',
            name='customer_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='apartment_customer', to=settings.AUTH_USER_MODEL),
        ),
    ]