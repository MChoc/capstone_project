from . import models

from rest_framework import serializers


class MenuSerializer(serializers.HyperlinkedModelSerializer):
    categories = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='category-detail'
    )

    class Meta:
        model = models.Menu
        fields = ['id', 'categories']


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    food_items = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='food_item-detail'
    )

    class Meta:
        model = models.Category
        fields = ['id', 'name', 'food_items']


class FoodItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.FoodItem
        fields = ['id', 'name', 'price']
