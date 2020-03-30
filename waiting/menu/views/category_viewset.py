from menu.models.category import Category
from menu.serializers.category_serializer import CategorySerializer

from rest_framework import viewsets


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
