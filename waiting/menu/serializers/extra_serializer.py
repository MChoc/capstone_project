from menu.models.extra import Extra

from rest_framework import serializers


class ExtraSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Extra
        fields = ['id', 'url', 'name', 'active', 'price', 'category',]
