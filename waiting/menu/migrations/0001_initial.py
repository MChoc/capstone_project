# Generated by Django 3.0.4 on 2020-04-09 07:49

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('active', models.BooleanField(default=True)),
            ],
            options={
                'verbose_name_plural': 'categories',
            },
        ),
        migrations.CreateModel(
            name='CreditCard',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.BigIntegerField(unique=True)),
                ('expiry_month', models.IntegerField()),
                ('expiry_year', models.IntegerField()),
                ('cvs', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Discount',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('amount', models.IntegerField()),
                ('discount', models.CharField(choices=[('PERCENTAGE', '%'), ('DOLLAR', 'Dollar')], default='PERCENTAGE', max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Extra',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('active', models.BooleanField(default=True)),
                ('price', models.DecimalField(decimal_places=2, max_digits=6)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='extras', to='menu.Category')),
            ],
        ),
        migrations.CreateModel(
            name='FoodItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('active', models.BooleanField(default=True)),
                ('price', models.DecimalField(decimal_places=2, max_digits=6)),
                ('description', models.CharField(blank=True, max_length=2048, null=True)),
                ('size', models.CharField(blank=True, choices=[('LARGE', 'L'), ('MEDIUM', 'M'), ('SMALL', 'S')], default=None, max_length=8, null=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='food_items', to='menu.Category')),
            ],
        ),
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('active', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('active', models.BooleanField(default=True)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('description', models.CharField(blank=True, max_length=1024, null=True)),
                ('credit_card', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='menu.CreditCard')),
                ('customer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='customer', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='TransactionFoodItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(blank=True, max_length=1024, null=True)),
                ('discount', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='menu.Discount')),
                ('extras', models.ManyToManyField(to='menu.Extra')),
                ('food_item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='menu.FoodItem')),
                ('transaction', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='menu.Transaction')),
            ],
        ),
        migrations.AddField(
            model_name='transaction',
            name='food_items',
            field=models.ManyToManyField(through='menu.TransactionFoodItem', to='menu.FoodItem'),
        ),
        migrations.AddField(
            model_name='fooditem',
            name='tags',
            field=models.ManyToManyField(to='menu.Tag'),
        ),
        migrations.AddField(
            model_name='category',
            name='menu',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='categories', to='menu.Menu'),
        ),
        migrations.CreateModel(
            name='Assistance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('problem', models.CharField(max_length=1024)),
                ('notes', models.CharField(blank=True, max_length=2048, null=True)),
                ('resolved', models.BooleanField(default=False)),
                ('transaction', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='menu.Transaction')),
                ('waiter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
