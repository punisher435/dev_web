# Generated by Django 3.1.4 on 2021-02-19 07:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coupons', '0003_auto_20210218_0625'),
    ]

    operations = [
        migrations.AddField(
            model_name='coupons',
            name='life',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]