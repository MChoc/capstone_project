import dateutil.parser
from datetime import datetime

from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from accounts.permissions import AdminOrPostOnly
from menu.models.transaction import Transaction
from menu.serializers.transaction_serializer import TransactionSerializer


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
        start_date = self.request.query_params.get('start_date')
        if start_date:
            start_date = dateutil.parser.parse(start_date)
        else:
            start_date = datetime(1970, 1, 1)

        if self.request.query_params.get('get_unprepared'):
            return Transaction.objects.filter(prepared=False, active=True).exclude(date__lt=start_date)
        return super().get_queryset().exclude(date__lt=start_date)
