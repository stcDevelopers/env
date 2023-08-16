# Generated by Django 2.2.7 on 2021-07-01 15:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Inventario', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BookTestDjango',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('author', models.CharField(max_length=100)),
                ('name_book', models.CharField(max_length=100)),
                ('editorial', models.CharField(max_length=100)),
                ('publication_date', models.DateField()),
            ],
            options={
                'db_table': 'Book_test_Django',
                'managed': False,
            },
        ),
    ]
