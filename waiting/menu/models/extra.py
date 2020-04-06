from menu.models.food_item import FoodItem

from django.db import models


class Extra(models.Model):
    name = models.CharField(max_length=200)
    active = models.BooleanField(default=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)

    def __str__(self):
        return self.name
