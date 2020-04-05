from menu.models.food_item import FoodItem

from django.db import models


class Extra(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    food_item = models.ManyToManyField(FoodItem)

    def __str__(self):
        return self.name
