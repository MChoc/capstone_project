from accounts.permissions import AdminOrPostOnly
from menu.models.transaction_food_item import TransactionFoodItem
from menu.serializers.transaction_food_item_serializer import TransactionFoodItemSerializer

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class TransactionFoodItemViewSet(viewsets.ModelViewSet):
    queryset = TransactionFoodItem.objects.all()
    serializer_class = TransactionFoodItemSerializer
    permission_classes = [AdminOrPostOnly | IsAuthenticatedOrReadOnly]

    """
    Overriding the get_queryset method to allow for listing
    transaction_food_items with given transaction_id.

    Checks if the 'transaction_id' field exists and is set to True.
        If it exists, return only a list of transaction_food_items with
        given transaction_id.
        Else execute default get_queryset method.
    """
    def get_queryset(self):
        transaction_id = self.request.query_params.get('transaction_id')
        if transaction_id:
            return TransactionFoodItem.objects.filter(
                transaction=transaction_id
            )
        return super().get_queryset()
