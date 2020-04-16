from django.db import models

from accounts.models import CustomUser
from menu.models.credit_card import CreditCard
from menu.models.food_item import FoodItem


class Transaction(models.Model):
    active = models.BooleanField(default=True)
    prepared = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)
    customer = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='customer',
        null=True,
        blank=True
    )
    food_items = models.ManyToManyField(
        FoodItem,
        through='TransactionFoodItem'
    )
    credit_card = models.ForeignKey(CreditCard, on_delete=models.CASCADE)
    request = models.CharField(max_length=1024, null=True, blank=True)
    total_price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        default=0
    )
