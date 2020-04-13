from menu.models.transaction import Transaction
from menu.serializers.transaction_serializer import TransactionSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework import viewsets
from accounts.permissions import AdminOrPostOnly


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = [AdminOrPostOnly | IsAuthenticatedOrReadOnly]
