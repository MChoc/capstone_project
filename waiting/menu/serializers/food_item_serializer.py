from django.db.models import Count, Sum
from rest_framework import serializers

from menu.models.food_item import FoodItem
from menu.models.transaction_food_item import TransactionFoodItem


class FoodItemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = FoodItem
        fields = ['id', 'url', 'name', 'active', 'price', 'description',
                  'category', 'tags', 'size']


class FoodItemStatsSerializer(serializers.ModelSerializer):
    total_orders = serializers.SerializerMethodField()
    total_revenue = serializers.SerializerMethodField()

    class Meta:
        model = FoodItem
        fields = ['id', 'name', 'size', 'total_orders', 'total_revenue']

    def get_total_orders(self, obj):
        return TransactionFoodItem.objects.filter(food_item=obj.id).aggregate(
            Count('food_item')
        )['food_item__count']

    def get_total_revenue(self, obj):
        return TransactionFoodItem.objects.filter(food_item=obj.id).aggregate(
            Sum('food_item__price')
        )['food_item__price__sum']
