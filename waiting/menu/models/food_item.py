from menu.models.category import Category
from menu.models.extra import Extra
from menu.models.tag import Tag

from django.db import models


class FoodItem(models.Model):
    name = models.CharField(max_length=200)
    active = models.BooleanField(default=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    description = models.CharField(max_length=2048, null=True, blank=True)
    category = models.ForeignKey(
        Category,
        related_name='food_items',
        on_delete=models.CASCADE
    )
    extras = models.ManyToManyField(Extra)
    tags = models.ManyToManyField(Tag)

    def __str__(self):
        return self.name
