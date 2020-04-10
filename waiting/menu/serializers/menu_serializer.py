from menu.models.menu import Menu

from rest_framework import serializers


class MenuSerializer(serializers.HyperlinkedModelSerializer):
    categories = serializers.HyperlinkedRelatedField(
        many=True,
        read_only=True,
        view_name='category-detail'
    )

    class Meta:
        model = Menu
        fields = ['id', 'url', 'name', 'active', 'categories']
