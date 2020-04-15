from rest_framework import serializers

from menu.models.discount import Discount


class DiscountSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Discount
        fields = ['id', 'url', 'name', 'amount']
