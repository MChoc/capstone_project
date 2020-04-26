from rest_framework import serializers

from menu.models.transaction import Transaction


class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    food_items = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='fooditem-detail'
    )
    transaction_food_items = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='transactionfooditem-detail'
    )

    class Meta:
        model = Transaction
        fields = ['id', 'url', 'active', 'prepared', 'date', 'customer',
                  'credit_card', 'food_items', 'request',  'total_price',
                  'transaction_food_items', 'kitchen_note']
