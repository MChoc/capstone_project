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
        fields = ['id', 'url', 'name', 'categories']


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    food_items = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='fooditem-detail'
    )

    class Meta:
        model = models.Category
        fields = ['id', 'url', 'menu', 'name', 'food_items']


class FoodItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = models.FoodItem
        fields = ['id', 'url', 'category', 'name', 'price']
