from menu.models.extra import Extra

from rest_framework import serializers


class ExtraSerializer(serializers.HyperlinkedModelSerializer):
    # # Placeholder for if we want to analyse extra statistics
    # transaction_food_items = serializers.HyperlinkedRelatedField(
    #     many=True,
    #     read_only=True,
    #     view_name='transactionfooditem-detail'
    # )

    class Meta:
        model = Extra
        fields = ['id', 'url', 'name', 'active', 'price', 'category']
