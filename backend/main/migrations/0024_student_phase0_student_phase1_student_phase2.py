# Generated by Django 4.0.3 on 2022-06-01 17:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0023_notify'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='phase0',
            field=models.FloatField(default=0, max_length=3),
        ),
        migrations.AddField(
            model_name='student',
            name='phase1',
            field=models.FloatField(default=0, max_length=3),
        ),
        migrations.AddField(
            model_name='student',
            name='phase2',
            field=models.FloatField(default=0, max_length=3),
        ),
    ]
