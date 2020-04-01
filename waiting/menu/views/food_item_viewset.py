from menu.models.food_item import FoodItem
from menu.serializers.food_item_serializer import FoodItemSerializer

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class FoodItemViewSet(viewsets.ModelViewSet):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
