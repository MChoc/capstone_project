from django.db.models import Count, Sum
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from accounts.permissions import IsManager
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
    permission_classes = [IsManager]
    http_method_names = [u'get']
