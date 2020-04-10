from menu.models.transaction_food_item import TransactionFoodItem
from menu.serializers.transaction_food_item_serializer import TransactionFoodItemSerializer

from rest_framework import viewsets
from accounts.permissions import AdminOrPostOnly


class TransactionFoodItemViewSet(viewsets.ModelViewSet):
    queryset = TransactionFoodItem.objects.all()
    serializer_class = TransactionFoodItemSerializer
    permission_classes = [AdminOrPostOnly]
