from menu.models.drink import Drink
from menu.serializers.drink_serializer import DrinkSerializer

from rest_framework import viewsets


class DrinkViewSet(viewsets.ModelViewSet):
    queryset = Drink.objects.all()
    serializer_class = DrinkSerializer
