from . import models, serializers

from rest_framework import viewsets


class MenuViewSet(viewsets.ModelViewSet):
    queryset = models.Menu.objects.all()
    serializer_class = serializers.MenuSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer


class FoodItemViewSet(viewsets.ModelViewSet):
    queryset = models.FoodItem.objects.all()
    serializer_class = serializers.FoodItemSerializer
