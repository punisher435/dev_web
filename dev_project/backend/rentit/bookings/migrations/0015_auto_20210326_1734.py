# Generated by Django 3.1.4 on 2021-03-26 12:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bookings', '0014_auto_20210323_0632'),
    ]

    operations = [
        migrations.AddField(
            model_name='apartmentbookings',
            name='refund_id',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='roombookings',
            name='refund_id',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='shopbookings',
            name='refund_id',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
