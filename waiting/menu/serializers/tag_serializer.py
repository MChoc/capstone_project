from menu.models.tag import Tag

from rest_framework import serializers


class TagSerializer(serializers.HyperlinkedModelSerializer):
    food_items = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='fooditem-detail'
    )
    
    class Meta:
        model = Tag
        fields = ['id', 'url', 'name', 'food_items']
