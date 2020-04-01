from menu.models.transaction import Transaction

from rest_framework import serializers


class TransactionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id', 'url', 'date', 'customer', 'credit_card']
