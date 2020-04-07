from menu.models.credit_card import CreditCard
from menu.serializers.credit_card_serializer import CreditCardSerializer

from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response


class CreditCardViewSet(ModelViewSet):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer


class CreditCardValidateView(APIView):
    """
    View to validate credit card information

    * All users (guest customers too) can access this view.
    """

    def post(self, request, format=None):
        """
        Validate the incoming credit card information.
        """
        return Response({'validated': True})
