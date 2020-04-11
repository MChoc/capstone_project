from menu.models.food_item import FoodItem
from menu.models.discount import Discount
from menu.models.extra import Extra
from menu.models.transaction import Transaction

from django.db import models


class TransactionFoodItem(models.Model):
    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE)
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE)

    discount = models.ForeignKey(
        Discount,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    extras = models.ManyToManyField(
        Extra,
        blank=True,
        related_name='transaction_food_items'
    )
    description = models.CharField(max_length=1024, null=True, blank=True)
