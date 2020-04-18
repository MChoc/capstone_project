import dateutil.parser
from datetime import datetime

from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from accounts.permissions import AdminOrPostOnly
from django.db.models import Sum
from menu.models.transaction import Transaction
from menu.models.transaction_food_item import TransactionFoodItem
from menu.serializers.transaction_serializer import TransactionSerializer


class TransactionViewSet(ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [AdminOrPostOnly | IsAuthenticatedOrReadOnly]

    """
    Overriding the get_queryset method to allow for listing only active
    transactions.

    Checks if the 'get_unprepared' field exists and is set to True.
        If it exists, return only a list of unprepared transactions.
        Else execute default get_queryset method.
    """
    def get_queryset(self):
        if self.request.query_params:
            ret_queryset = Transaction.objects.all()
            if self.request.query_params.get('start_date'):
                start_date = dateutil.parser.parse(
                    self.request.query_params.get('start_date')
                )
                ret_queryset = ret_queryset.exclude(date__lt=start_date)
            if self.request.query_params.get('get_unprepared'):
                ret_queryset = ret_queryset.filter(prepared=False, active=True)
            return ret_queryset
        return super().get_queryset()

    def update(self, request, *args, **kwargs):
        if request.data.get('checkout'):
            total_price = TransactionFoodItem.objects.filter(
                transaction=self.get_object().pk
            ).aggregate(Sum('price'))['price__sum']
            request.data['total_price'] = round(total_price, 2)
        return super().update(request, *args, **kwargs)
