from django.db.models import Count, Sum
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny
from rest_framework.response import Response

from menu.models.food_item import FoodItem
from menu.serializers.food_item_serializer import (
    FoodItemSerializer,
    FoodItemStatsSerializer
)


class FoodItemViewSet(ModelViewSet):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class FoodItemStatsViewSet(ModelViewSet):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemStatsSerializer
    permission_classes = [AllowAny]
    http_method_names = [u'get']
