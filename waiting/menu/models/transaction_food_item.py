from django.db import models

from menu.models.discount import Discount
from menu.models.extra import Extra
from menu.models.food_item import FoodItem
from menu.models.transaction import Transaction


class TransactionFoodItem(models.Model):
    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE)
    transaction = models.ForeignKey(
        Transaction,
        on_delete=models.CASCADE,
        related_name='transaction_food_items'
    )

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
    price = models.DecimalField(
        max_digits=8,
        decimal_places=2,
        null=True,
        blank=True
    )
    request = models.CharField(max_length=1024, null=True, blank=True)

    def save(self, *args, **kwargs):
        # Only calculate if model is instantiated
        if self.food_item:
            food_item = float(self.food_item.price)
            extras = self.extras.all().aggregate(models.Sum('price'))['price__sum']

            if extras is not None:
                sub_total = food_item + extras
            else:
                sub_total = food_item

            discount = self.discount
            if discount is not None:
                if discount.type == 'PERCENTAGE':
                    self.price = sub_total * discount.amount / 100
                else:
                    self.price = sub_total - discount.amount
            else:
                self.price = sub_total
        super().save(*args, **kwargs)
