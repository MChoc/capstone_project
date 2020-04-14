from accounts.permissions import AdminOrPostOnly
from menu.models.transaction import Transaction
from menu.serializers.transaction_serializer import TransactionSerializer

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class TransactionViewSet(ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [AdminOrPostOnly | IsAuthenticatedOrReadOnly]

    """
    Overriding the get_queryset method to allow for listing only active
    transactions.

    Checks if the 'get_active' field exists and is set to True.
        If it exists, return only a list of active transactions.
        Else execute default get_queryset method.
    """
    def get_queryset(self):
        if self.request.query_params.get('get_unprepared'):
            return Transaction.objects.filter(prepared=False)
        return super().get_queryset()
