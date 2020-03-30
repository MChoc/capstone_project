from menu.models.drink import Drink

from rest_framework import serializers


class DrinkSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Drink
        fields = ['id', 'url', 'food_item', 'size']
