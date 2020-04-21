from django.db.models import Sum
from rest_framework import serializers

from menu.models.extra import Extra
from menu.models.transaction_food_item import TransactionFoodItem


class TransactionFoodItemSerializer(serializers.HyperlinkedModelSerializer):
    price = serializers.SerializerMethodField()

    class Meta:
        model = TransactionFoodItem
        fields = ['id', 'url', 'food_item', 'transaction', 'discount',
                  'extras', 'price', 'request']

    def get_price(self, instance):
        food_item = float(instance.food_item.price)
        extras = instance.extras.all().aggregate(Sum('price'))['price__sum']
        if extras is not None:
            sub_total = food_item + float(extras)
        else:
            sub_total = food_item

        discount = instance.discount
        if discount is not None:
            if discount.type == 'PERCENTAGE':
                instance.price = round(
                    sub_total * (1 - discount.amount / 100),
                    2
                )
            else:
                instance.price = round(sub_total - discount.amount, 2)
        else:
            instance.price = round(sub_total, 2)
        instance.save()
        return instance.price
