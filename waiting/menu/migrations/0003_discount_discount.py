# Generated by Django 3.0.4 on 2020-03-30 05:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0002_remove_fooditem_extras'),
    ]

    operations = [
        migrations.AddField(
            model_name='discount',
            name='discount',
            field=models.CharField(choices=[('PERCENTAGE', '%'), ('DOLLAR', 'Dollar')], default='PERCENTAGE', max_length=10),
        ),
    ]
