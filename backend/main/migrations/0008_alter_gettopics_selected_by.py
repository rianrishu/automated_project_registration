# Generated by Django 4.0.4 on 2022-05-15 08:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_alter_adminlogin_password'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gettopics',
            name='selected_by',
            field=models.CharField(max_length=3, null=True),
        ),
    ]
