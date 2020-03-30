from menu.models.discount import Discount
from menu.serializers.discount_serializer import DiscountSerializer

from rest_framework import viewsets


class DiscountViewSet(viewsets.ModelViewSet):
    queryset = Discount.objects.all()
    serializer_class = DiscountSerializer
