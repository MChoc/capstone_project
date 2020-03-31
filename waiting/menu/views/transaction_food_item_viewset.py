from menu.models.transaction_food_item import TransactionFoodItem
from menu.serializers.transaction_food_item_serializer import TransactionFoodItemSerializer

from rest_framework import viewsets


class TransactionFoodItemViewSet(viewsets.ModelViewSet):
    queryset = TransactionFoodItem.objects.all()
    serializer_class = TransactionFoodItemSerializer
