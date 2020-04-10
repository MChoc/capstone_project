from menu.models.credit_card import CreditCard
from menu.serializers.credit_card_serializer import CreditCardSerializer

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from accounts.permissions import LoggedInOrValidateOnly


class CreditCardViewSet(ModelViewSet):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer
    permission_classes = [LoggedInOrValidateOnly]


class ValidateViewSet(ModelViewSet):
    """
    View to validate credit card information.
    """
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer
    permission_classes = [LoggedInOrValidateOnly]
    http_method_names = [u'post']

    def create(self, request, format=None):
        """
        Return whether credit was validated or not and if so, return the credit
            card object.
        """
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
