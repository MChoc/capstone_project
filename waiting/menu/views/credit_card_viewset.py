from menu.models.credit_card import CreditCard
from menu.serializers.credit_card_serializer import CreditCardSerializer

from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.response import Response
from accounts.permissions import LoggedInOrValidateOnly


class CreditCardViewSet(viewsets.ModelViewSet):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer
    permission_classes = [LoggedInOrValidateOnly]

    @action(detail=False, methods=['POST'])
    def validate(self, request, *args, **kwargs):
        """
        An extra action that validates the incoming credit card data and checks
            if it exists in the database.
        """
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            credit_card = CreditCard.objects.get(
                number=request.data['number'],
                expiry_month=request.data['expiry_month'],
                expiry_year=request.data['expiry_year'],
                cvs=request.data['cvs']
            )
        except CreditCard.DoesNotExist:
            return Response({'validated': False})

        response = CreditCardSerializer(
            credit_card,
            context=self.get_serializer_context()
        ).data
        response['validated'] = True
        
        return Response(response)
