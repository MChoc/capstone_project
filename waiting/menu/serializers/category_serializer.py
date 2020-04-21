from rest_framework import serializers

from menu.models.category import Category
from menu.models.extra import Extra
from menu.models.food_item import FoodItem
from menu.serializers.extra_serializer import ExtraStatsSerializer
from menu.serializers.food_item_serializer import FoodItemStatsSerializer


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    food_items = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='fooditem-detail'
    )
    extras = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='extra-detail'
    )

    class Meta:
        model = Category
        fields = ['id', 'url', 'name', 'active', 'menu', 'food_items',
                  'extras']


class CategoryStatsSerializer(serializers.ModelSerializer):
    food_items = serializers.SerializerMethodField()
    extras = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'food_items', 'extras']

    def get_food_items(self, obj):
        food_items = FoodItem.objects.filter(category=obj.id)
        return FoodItemStatsSerializer(food_items, many=True).data

    def get_extras(self, obj):
        extras = Extra.objects.filter(category=obj.id)
        return ExtraStatsSerializer(extras, many=True).data
