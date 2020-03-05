from django.db import models


class FoodItem(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)


class Category(models.Model):
    name = models.CharField(max_length=200)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)


class Menu(models.Model):
    pass
