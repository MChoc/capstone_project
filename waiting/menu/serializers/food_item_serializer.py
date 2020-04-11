from menu.models.food_item import FoodItem
from menu.models.tag import Tag

from rest_framework import serializers


class FoodItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FoodItem
        fields = ['id', 'url', 'name', 'active', 'price', 'description',
                  'category', 'tags', 'size',]
