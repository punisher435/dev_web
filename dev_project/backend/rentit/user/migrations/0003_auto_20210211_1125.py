# Generated by Django 3.1.4 on 2021-02-11 11:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_seller_bank_details_commission'),
    ]

    operations = [
        migrations.AlterField(
            model_name='seller_bank_details',
            name='total_due_payment',
            field=models.BigIntegerField(default=0),
        ),
    ]