from django.db.models import Sum
from django.db.models.signals import post_save
from django.dispatch import receiver

from menu.models.transaction import Transaction
from menu.models.transaction_food_item import TransactionFoodItem


@receiver(post_save, sender=TransactionFoodItem)
def save_profile(sender, instance, **kwargs):
    transaction = instance.transaction

    instance.transaction.total_price = TransactionFoodItem.objects.filter(
        transaction=instance.transaction.pk
    ).aggregate(Sum('price'))['price__sum']
    instance.transaction.save()
