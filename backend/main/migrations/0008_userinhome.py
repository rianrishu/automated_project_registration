# Generated by Django 4.0.3 on 2022-05-17 08:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_alter_adminlogin_password'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserInHome',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('batch_id', models.CharField(blank=True, max_length=5, null=True)),
                ('faculty_username', models.CharField(blank=True, max_length=5, null=True)),
            ],
        ),
    ]
