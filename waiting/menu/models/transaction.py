from accounts.models import CustomUser
from menu.models.credit_card import CreditCard
from menu.models.food_item import FoodItem

from django.db import models


class Transaction(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    customer = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='customer'
    )
    food_items = models.ManyToManyField(
        FoodItem,
        through='TransactionFoodItem'
    )
    credit_card = models.ForeignKey(CreditCard, on_delete=models.CASCADE)
