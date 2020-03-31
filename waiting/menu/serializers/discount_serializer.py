from menu.models.discount import Discount

from rest_framework import serializers


class DiscountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Discount
        fields = ['id', 'url', 'name', 'amount']
