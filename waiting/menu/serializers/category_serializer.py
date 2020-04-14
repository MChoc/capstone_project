from rest_framework import serializers

from menu.models.category import Category


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
