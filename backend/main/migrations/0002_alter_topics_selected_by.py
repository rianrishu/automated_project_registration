# Generated by Django 4.0.3 on 2022-04-17 05:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='topics',
            name='selected_by',
            field=models.CharField(default='', max_length=3),
        ),
    ]