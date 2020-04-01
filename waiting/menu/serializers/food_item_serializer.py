from menu.models.food_item import FoodItem

from rest_framework import serializers


class FoodItemSerializer(serializers.HyperlinkedModelSerializer):
    tags = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='tag-detail'
    )
    transactions = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='transaction-detail'
    )

    class Meta:
        model = FoodItem
        fields = [
            'id',
            'url',
            'name',
            'active',
            'price',
            'description',
            'category',
            'tags',
            'transactions'
        ]
