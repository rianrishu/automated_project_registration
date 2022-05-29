# Generated by Django 4.0.4 on 2022-05-28 20:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0020_delete_userinhome_gettopics_faculty'),
    ]

    operations = [
        migrations.CreateModel(
            name='AuthToken',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('token', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='StudentTopicAcceptReject',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('description', models.CharField(max_length=1500)),
                ('selected_by', models.CharField(blank=True, max_length=3)),
                ('faculty', models.CharField(blank=True, max_length=20, null=True)),
                ('status', models.CharField(blank=True, max_length=10, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='gettopics',
            name='id_topic',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='gettopics',
            name='description',
            field=models.CharField(blank=True, max_length=1500),
        ),
        migrations.AlterField(
            model_name='gettopics',
            name='name',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]