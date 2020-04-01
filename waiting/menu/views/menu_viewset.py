from menu.models.menu import Menu
from menu.serializers.menu_serializer import MenuSerializer

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
