from rest_framework import serializers

from menu.models.credit_card import CreditCard


class CreditCardSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CreditCard
        fields = ['id', 'url', 'number', 'expiry_month', 'expiry_year', 'cvv']
