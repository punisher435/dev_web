# Generated by Django 3.1.4 on 2020-12-24 12:44

from django.db import migrations, models
import django_google_maps.fields
import products.models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='apartment_rating_and_reviews',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.DecimalField(decimal_places=2, max_digits=4)),
                ('reviews', models.TextField()),
                ('timestamp', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='apartments',
            fields=[
                ('apartment_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('price', models.PositiveBigIntegerField()),
                ('owner_discount', models.IntegerField(default=0)),
                ('company_discount', models.IntegerField(default=0)),
                ('fake_discount', models.IntegerField(default=0)),
                ('final_price', models.PositiveBigIntegerField(default=models.PositiveBigIntegerField())),
                ('length', models.IntegerField()),
                ('breadth', models.IntegerField()),
                ('height', models.IntegerField()),
                ('furniture', models.TextField()),
                ('verified', models.BooleanField(default=False)),
                ('BHK', models.IntegerField()),
                ('trust_points', models.BigIntegerField(default=0)),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('date_verified', models.DateTimeField(auto_now_add=True)),
                ('photo1', models.ImageField(default='/images/rooms/default.jpg', upload_to=products.models.upload_to_apartments, verbose_name='Image')),
                ('photo2', models.ImageField(default='/images/rooms/default.jpg', upload_to=products.models.upload_to_apartments, verbose_name='Image')),
                ('photo3', models.ImageField(default='/images/rooms/default.jpg', upload_to=products.models.upload_to_apartments, verbose_name='Image')),
                ('photo4', models.ImageField(default='/images/rooms/default.jpg', upload_to=products.models.upload_to_apartments, verbose_name='Image')),
                ('photo5', models.ImageField(default='/images/rooms/default.jpg', upload_to=products.models.upload_to_apartments, verbose_name='Image')),
                ('booked', models.BooleanField(default=False)),
                ('removed', models.BooleanField(default=False)),
                ('category', models.CharField(max_length=255)),
                ('facilities', models.TextField()),
                ('description', models.TextField()),
                ('location', models.TextField()),
                ('city', models.CharField(max_length=255)),
                ('wifi', models.BooleanField(default=False)),
                ('state', models.CharField(max_length=255)),
                ('country', models.CharField(max_length=255)),
                ('landmark', models.CharField(max_length=255)),
                ('pincode', models.CharField(max_length=255)),
                ('address', django_google_maps.fields.AddressField(max_length=200)),
                ('geolocation', django_google_maps.fields.GeoLocationField(max_length=100)),
                ('avg_rating', models.DecimalField(decimal_places=1, default=0, max_digits=3)),
                ('electricity', models.BooleanField(default=True)),
                ('water_facility', models.BooleanField(default=True)),
                ('TV', models.CharField(max_length=255)),
                ('power_backup', models.BooleanField(default=False)),
                ('geyser', models.BooleanField(default=False)),
                ('nearby_station1', models.TextField(max_length=255)),
                ('nearby_station2', models.TextField(max_length=255)),
                ('nearby_restaurant1', models.TextField(max_length=255)),
                ('nearby_restaurant2', models.TextField(max_length=255)),
                ('apartment_policy', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='room_rating_and_reviews',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.DecimalField(decimal_places=2, max_digits=4)),
                ('reviews', models.TextField()),
                ('timestamp', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='rooms',
            fields=[
                ('room_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('price', models.PositiveBigIntegerField()),
                ('owner_discount', models.IntegerField(default=0)),
                ('company_discount', models.IntegerField(default=0)),
                ('fake_discount', models.IntegerField(default=0)),
                ('final_price', models.PositiveBigIntegerField(default=models.PositiveBigIntegerField())),
                ('length', models.IntegerField()),
                ('breadth', models.IntegerField()),
                ('height', models.IntegerField()),
                ('furniture', models.TextField()),
                ('verified', models.BooleanField(default=False)),
                ('capacity', models.IntegerField()),
                ('trust_points', models.BigIntegerField(default=0)),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('date_verified', models.DateTimeField(auto_now_add=True)),
                ('photo1', models.ImageField(default='/images/rooms/default.jpg', upload_to=products.models.upload_to, verbose_name='Image')),
                ('photo2', models.ImageField(default='/images/rooms/default.jpg', upload_to=products.models.upload_to, verbose_name='Image')),
                ('photo3', models.ImageField(default='/images/rooms/default.jpg', upload_to=products.models.upload_to, verbose_name='Image')),
                ('photo4', models.ImageField(default='/images/rooms/default.jpg', upload_to=products.models.upload_to, verbose_name='Image')),
                ('photo5', models.ImageField(default='/images/rooms/default.jpg', upload_to=products.models.upload_to, verbose_name='Image')),
                ('booked', models.BooleanField(default=False)),
                ('removed', models.BooleanField(default=False)),
                ('category', models.CharField(max_length=255)),
                ('facility', models.TextField()),
                ('description', models.TextField()),
                ('location', models.TextField()),
                ('city', models.CharField(max_length=255)),
                ('state', models.CharField(max_length=255)),
                ('country', models.CharField(max_length=255)),
                ('landmark', models.CharField(max_length=255)),
                ('pincode', models.CharField(max_length=255)),
                ('address', django_google_maps.fields.AddressField(max_length=200)),
                ('geolocation', django_google_maps.fields.GeoLocationField(max_length=100)),
                ('avg_rating', models.DecimalField(decimal_places=1, default=0, max_digits=3)),
                ('electricity', models.BooleanField(default=True)),
                ('water_facility', models.BooleanField(default=True)),
                ('house_TV', models.BooleanField(max_length=255)),
                ('power_backup', models.BooleanField(default=False)),
                ('geyser', models.BooleanField(default=False)),
                ('wifi', models.BooleanField(default=False)),
                ('nearby_station1', models.TextField(max_length=255)),
                ('nearby_station2', models.TextField(max_length=255)),
                ('nearby_restaurant1', models.TextField(max_length=255)),
                ('nearby_restaurant2', models.TextField(max_length=255)),
                ('breakfast', models.BooleanField(default=True)),
                ('lunch', models.BooleanField(default=True)),
                ('dinner', models.BooleanField(default=True)),
                ('room_policy', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='shop_rating_and_reviews',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.DecimalField(decimal_places=2, max_digits=4)),
                ('reviews', models.TextField()),
                ('timestamp', models.DateTimeField(auto_now=True)),
            ],
        ),
        migrations.CreateModel(
            name='shops',
            fields=[
                ('room_id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('price', models.PositiveBigIntegerField()),
                ('owner_discount', models.IntegerField(default=0)),
                ('company_discount', models.IntegerField(default=0)),
                ('fake_discount', models.IntegerField(default=0)),
                ('final_price', models.PositiveBigIntegerField(default=models.PositiveBigIntegerField())),
                ('length', models.IntegerField()),
                ('breadth', models.IntegerField()),
                ('height', models.IntegerField()),
                ('furniture', models.TextField()),
                ('verified', models.BooleanField(default=False)),
                ('trust_points', models.BigIntegerField(default=0)),
                ('date_added', models.DateTimeField(auto_now_add=True)),
                ('date_verified', models.DateTimeField(auto_now_add=True)),
                ('photo1', models.ImageField(default='/images/rooms/default.jpg', upload_to=products.models.upload_to_shops, verbose_name='Image')),
                ('photo2', models.ImageField(default='/images/rooms/default.jpg', upload_to=products.models.upload_to_shops, verbose_name='Image')),
                ('photo3', models.ImageField(default='/images/rooms/default.jpg', upload_to=products.models.upload_to_shops, verbose_name='Image')),
                ('photo4', models.ImageField(default='/images/rooms/default.jpg', upload_to=products.models.upload_to_shops, verbose_name='Image')),
                ('photo5', models.ImageField(default='/images/rooms/default.jpg', upload_to=products.models.upload_to_shops, verbose_name='Image')),
                ('booked', models.BooleanField(default=False)),
                ('removed', models.BooleanField(default=False)),
                ('category', models.CharField(max_length=255)),
                ('facilities', models.TextField()),
                ('description', models.TextField()),
                ('location', models.TextField()),
                ('city', models.CharField(max_length=255)),
                ('state', models.CharField(max_length=255)),
                ('country', models.CharField(max_length=255)),
                ('landmark', models.CharField(max_length=255)),
                ('pincode', models.CharField(max_length=255)),
                ('address', django_google_maps.fields.AddressField(max_length=200)),
                ('geolocation', django_google_maps.fields.GeoLocationField(max_length=100)),
                ('avg_rating', models.DecimalField(decimal_places=1, default=0, max_digits=3)),
                ('electricity', models.BooleanField(default=True)),
                ('water_facility', models.BooleanField(default=True)),
                ('wifi', models.BooleanField(default=False)),
                ('power_backup', models.BooleanField(default=False)),
                ('nearby_station1', models.TextField(max_length=255)),
                ('nearby_station2', models.TextField(max_length=255)),
                ('shop_policy', models.TextField()),
            ],
        ),
    ]
