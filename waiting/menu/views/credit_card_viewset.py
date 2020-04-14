from menu.models.credit_card import CreditCard
from menu.serializers.credit_card_serializer import CreditCardSerializer

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from accounts.permissions import LoggedInOrValidateOnly


class CreditCardViewSet(ModelViewSet):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer
    permission_classes = [LoggedInOrValidateOnly]

    """
    Overriding the create method to allow for credit card validation.

    Checks if the 'validate' field exists and is set to True.
        If it exists, return the credit card object and set 'validated' to True.
        Else execute default create method.
    """
    def create(self, request, *args, **kwargs):
        if request.data.get('validate'):
            try:
                credit_card = CreditCard.objects.get(
                    number=request.data['number'],
                    expiry_month=request.data['expiry_month'],
                    expiry_year=request.data['expiry_year'],
                    cvv=request.data['cvv']
                )
            except CreditCard.DoesNotExist:
                return Response({'validated': False})

            response = CreditCardSerializer(
                credit_card,
                context=self.get_serializer_context()
            ).data
            response['validated'] = True

            return Response(response)
        return super().create(request, *args, **kwargs)
