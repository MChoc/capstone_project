from menu.models.transaction import Transaction
from menu.serializers.transaction_serializer import TransactionSerializer

from rest_framework import viewsets


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
