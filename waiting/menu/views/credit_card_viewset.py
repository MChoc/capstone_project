from menu.models.credit_card import CreditCard
from menu.serializers.credit_card_serializer import CreditCardSerializer

from rest_framework import viewsets


class CreditCardViewSet(viewsets.ModelViewSet):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer
