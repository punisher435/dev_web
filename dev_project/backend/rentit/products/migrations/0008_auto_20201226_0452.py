# Generated by Django 3.1.4 on 2020-12-26 04:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0007_auto_20201225_1812'),
    ]

    operations = [
        migrations.AddField(
            model_name='apartments',
            name='AC',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='apartments',
            name='cooler',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='apartments',
            name='cost_AC',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='apartments',
            name='cost_cooler',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='apartments',
            name='cost_purified_water',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='apartments',
            name='purified_water',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='rooms',
            name='AC',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='rooms',
            name='cooler',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='rooms',
            name='cost_AC',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='rooms',
            name='cost_cooler',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='rooms',
            name='cost_iron',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='rooms',
            name='cost_laundry',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='rooms',
            name='cost_purified_water',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='rooms',
            name='guest_allowed',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='rooms',
            name='iron',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='rooms',
            name='laundry',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='rooms',
            name='purified_water',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='rooms',
            name='room_TV',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='shops',
            name='cost_purified_water',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='shops',
            name='purified_water',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='rooms',
            name='house_TV',
            field=models.BooleanField(default=False),
        ),
    ]
