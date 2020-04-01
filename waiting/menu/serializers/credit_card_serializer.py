from menu.models.credit_card import CreditCard

from rest_framework import serializers


class CreditCardSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CreditCard
        fields = ['id', 'url', 'number', 'expiry_month', 'expiry_year', 'cvs']
