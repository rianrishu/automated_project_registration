# Generated by Django 4.0.4 on 2022-05-15 08:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0012_alter_gettopics_selected_by'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gettopics',
            name='selected_by',
            field=models.CharField(max_length=3),
        ),
    ]
