# Generated by Django 4.0.5 on 2022-06-25 09:59

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('app', '0002_delete_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='AbstractBaseUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128)),
                ('user', models.CharField(max_length=128)),
            ],
        ),
    ]
