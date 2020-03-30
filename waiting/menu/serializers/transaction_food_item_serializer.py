from menu.models.transaction_food_item import TransactionFoodItem

from rest_framework import serializers


class TransactionFoodItemSerializer(serializers.HyperlinkedModelSerializer):
    extras = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='extra-detail'
    )

    class Meta:
        model = TransactionFoodItem
        fields = ['id', 'url', 'food_item', 'transaction', 'discount', 'extras']
