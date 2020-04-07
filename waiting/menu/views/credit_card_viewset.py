from menu.models.credit_card import CreditCard
from menu.serializers.credit_card_serializer import CreditCardSerializer

from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response


class CreditCardViewSet(viewsets.ModelViewSet):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer

    """
    An extra action that validates the incoming credit card data and checks
        if it exists in the database.
    """
    @action(detail=False, methods=['POST'])
    def validate(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            CreditCard.objects.get(
                number=request.data['number'],
                expiry_month=request.data['expiry_month'],
                expiry_year=request.data['expiry_year'],
                cvs=request.data['cvs']
            )
        except CreditCard.DoesNotExist:
            return Response({'validated': False})
        
        return Response({'validated': True})
