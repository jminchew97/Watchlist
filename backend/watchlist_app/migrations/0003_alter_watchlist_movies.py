# Generated by Django 3.2.12 on 2023-12-07 22:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('watchlist_app', '0002_auto_20231207_1546'),
    ]

    operations = [
        migrations.AlterField(
            model_name='watchlist',
            name='movies',
            field=models.ManyToManyField(default=None, related_name='watchlists', to='watchlist_app.Movie'),
        ),
    ]
