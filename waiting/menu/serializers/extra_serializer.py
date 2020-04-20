from django.db.models import Count, Sum
from rest_framework import serializers

from menu.models.extra import Extra
from menu.models.transaction_food_item import TransactionFoodItem


class ExtraSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Extra
        fields = ['id', 'url', 'name', 'active', 'price', 'category']


class ExtraStatsSerializer(serializers.ModelSerializer):
    total_orders = serializers.SerializerMethodField()
    total_revenue = serializers.SerializerMethodField()

    class Meta:
        model = Extra
        fields = ['id', 'name', 'total_orders', 'total_revenue']

    def get_total_orders(self, obj):
        return TransactionFoodItem.extras.through.objects.filter(
            extra_id=obj.id
        ).aggregate(total_orders=Count('extra_id'))

    def get_total_revenue(self, obj):
        return TransactionFoodItem.extras.through.objects.filter(
            extra_id=obj.id
        ).aggregate(total_revenue=Sum('extra__price'))
