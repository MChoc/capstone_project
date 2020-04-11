from menu.models.extra import Extra
from menu.models.transaction_food_item import TransactionFoodItem

from rest_framework import serializers


class TransactionFoodItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = TransactionFoodItem
        fields = ['id', 'url', 'food_item', 'transaction', 'discount', 'extras',
                  'description']
