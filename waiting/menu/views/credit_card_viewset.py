from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from accounts.permissions import LoggedInOrValidateOnly

from menu.models.credit_card import CreditCard
from menu.serializers.credit_card_serializer import CreditCardSerializer


class CreditCardViewSet(ModelViewSet):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer
    permission_classes = [LoggedInOrValidateOnly]

    """
    Overriding the list method to allow for credit card validation.

    Checks if the 'validate' field exists and is set to True.
        If it exists, return the credit card object and set 'validated' to
        True.
        Else execute default list method.
    """
    def list(self, request, *args, **kwargs):
        if self.request.query_params.get('validate'):
            try:
                credit_card = CreditCard.objects.get(
                    number=self.request.query_params.get('number'),
                    expiry_month=self.request.query_params.get('expiry_month'),
                    expiry_year=self.request.query_params.get('expiry_year'),
                    cvv=self.request.query_params.get('cvv')
                )
            except CreditCard.DoesNotExist:
                return Response({'validated': False})

            response = CreditCardSerializer(
                credit_card,
                context=self.get_serializer_context()
            ).data
            response['validated'] = True
            return Response(response)
        return super().list(request, *args, **kwargs)
