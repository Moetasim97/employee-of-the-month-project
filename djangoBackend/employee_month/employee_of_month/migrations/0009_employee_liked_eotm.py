# Generated by Django 4.2.4 on 2023-10-11 16:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employee_of_month', '0008_merge_20231010_2051'),
    ]

    operations = [
        migrations.AddField(
            model_name='employee',
            name='liked_eotm',
            field=models.BooleanField(default=False),
        ),
    ]
