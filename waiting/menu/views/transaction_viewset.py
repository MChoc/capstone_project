from menu.models.transaction import Transaction
from menu.serializers import transaction_serializer

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from accounts.permissions import AdminOrPostOnly


class TransactionViewSet(ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = transaction_serializer.TransactionSerializer
    permission_classes = [AdminOrPostOnly]

    """
    Overriding the get_queryset method to allow for listing only active
    transactions.

    Checks if the 'get_active' field exists and is set to True.
        If it exists, return only a list of active transactions.
        Else execute default get_queryset method.
    """
    def get_queryset(self):
        if self.request.query_params.get('get_active'):
            return Transaction.objects.filter(active=True)
        return super().get_queryset()
