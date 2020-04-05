from menu.models.transaction import Transaction

from rest_framework import serializers


class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    food_items = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='fooditem-detail'
    )
    
    class Meta:
        model = Transaction
        fields = ['id', 'url', 'date', 'customer', 'credit_card', 'food_items']
