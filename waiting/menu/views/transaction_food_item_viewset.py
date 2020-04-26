from django.db.models import Sum
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from accounts.permissions import IsStaffOrPostOnly
from menu.models.transaction_food_item import TransactionFoodItem
from menu.serializers.transaction_food_item_serializer import (
    TransactionFoodItemSerializer
)
from rest_framework.response import Response
from rest_framework import status


class TransactionFoodItemViewSet(ModelViewSet):
    queryset = TransactionFoodItem.objects.all()
    serializer_class = TransactionFoodItemSerializer
    permission_classes = [IsStaffOrPostOnly | IsAuthenticatedOrReadOnly]

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

    def create(self, request, *args, **kwargs):
        # Instantiate object first
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        tfi = TransactionFoodItem.objects.get(id=int(serializer.data['id']))

        food_item = float(tfi.food_item.price)
        extras = tfi.extras.all().aggregate(Sum('price'))['price__sum']
        if extras is None:
            extras = 0

        sub_total = food_item + float(extras)
        discount = tfi.discount
        if discount is not None:
            if discount.type == 'PERCENTAGE':
                tfi.price = round(sub_total * (1 - discount.amount / 100), 2)
            else:
                tfi.price = round(sub_total - discount.amount, 2)
        else:
            tfi.price = round(sub_total, 2)
        tfi.save()

        serializer = self.get_serializer(tfi)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
