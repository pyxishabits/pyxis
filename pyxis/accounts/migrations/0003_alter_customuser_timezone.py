# Generated by Django 4.2 on 2023-05-08 23:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_customuser_timezone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='timezone',
            field=models.CharField(blank=True, max_length=40, null=True),
        ),
    ]