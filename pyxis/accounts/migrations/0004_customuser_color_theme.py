# Generated by Django 4.2 on 2023-05-09 16:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_alter_customuser_timezone'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='color_theme',
            field=models.CharField(choices=[('D', 'dark'), ('L', 'light')], default='L', max_length=1),
        ),
    ]