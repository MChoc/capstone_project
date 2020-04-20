from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from accounts.permissions import IsManager
from menu.models.category import Category
from menu.serializers.category_serializer import CategorySerializer, CategoryStatsSerializer


class CategoryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class CategoryStatsViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategoryStatsSerializer
    permission_classes = [IsManager]
    http_method_names = [u'get']
