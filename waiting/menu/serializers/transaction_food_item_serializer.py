from django.db.models import Sum
from rest_framework import serializers

from menu.models.extra import Extra
from menu.models.transaction_food_item import TransactionFoodItem


class TransactionFoodItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TransactionFoodItem
        fields = ['id', 'url', 'food_item', 'transaction', 'discount',
                  'extras', 'price', 'request']

