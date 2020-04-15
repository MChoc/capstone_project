from rest_framework import serializers

from menu.models.food_item import FoodItem


class FoodItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FoodItem
        fields = ['id', 'url', 'name', 'active', 'price', 'description',
                  'category', 'tags', 'size']
