# Generated by Django 3.1.4 on 2020-12-26 06:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0012_auto_20201226_0539'),
    ]

    operations = [
        migrations.AddField(
            model_name='rooms',
            name='reviews',
            field=models.DecimalField(decimal_places=1, default=0, max_digits=2),
        ),
        migrations.AlterField(
            model_name='apartments',
            name='avg_rating',
            field=models.DecimalField(decimal_places=1, default=0, max_digits=2),
        ),
        migrations.AlterField(
            model_name='rooms',
            name='avg_rating',
            field=models.DecimalField(decimal_places=1, default=0, max_digits=2),
        ),
        migrations.AlterField(
            model_name='shops',
            name='avg_rating',
            field=models.DecimalField(decimal_places=1, default=0, max_digits=2),
        ),
    ]