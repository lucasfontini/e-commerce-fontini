# Generated by Django 5.0.6 on 2024-07-05 01:21

import django.db.models.deletion
import userauths.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_deliverycouriers_alter_product_options_product_date_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Brand',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('image', models.ImageField(blank=True, default='brand.jpg', null=True, upload_to=userauths.models.user_directory_path)),
                ('active', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name_plural': 'Brands',
            },
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=30)),
                ('active', models.BooleanField(default=True)),
                ('slug', models.SlugField(max_length=30, unique=True, verbose_name='Tag slug')),
                ('category', models.ForeignKey(default='', on_delete=django.db.models.deletion.PROTECT, to='store.category', verbose_name='Category')),
            ],
            options={
                'verbose_name_plural': 'Tags',
                'ordering': ('title',),
            },
        ),
    ]
