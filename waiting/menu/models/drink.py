from menu.models.food_item import FoodItem

from django.db import models


class Drink(models.Model):
    food_item = models.OneToOneField(FoodItem, on_delete=models.CASCADE)
    
    SIZE_CHOICES = (
        ('LARGE', 'L'),
        ('MEDIUM', 'M'),
        ('SMALL', 'S')
    )
    size = models.CharField(
        max_length=8,
        choices=SIZE_CHOICES,
        default='MEDIUM'
    )
