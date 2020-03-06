from waiting.menu import models

from rest_framework import serializers


class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.FoodItem
        fields = ['id', 'name', 'price']


class CategorySerializer(serializers.ModelSerializer):
    food_items = serializers.StringRelatedField(many=True)

    class Meta:
        model = models.Category
        fields = ['id', 'name', 'food_items']


class MenuSerializer(serializers.ModelSerializer):
    categories = serializers.StringRelatedField(many=True)

    class Meta:
        model = models.Menu
        fields = ['id', 'categories']
