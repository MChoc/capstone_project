from menu.models.menu import Menu
from menu.serializers.menu_serializer import MenuSerializer

from rest_framework import viewsets


class MenuViewSet(viewsets.ModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
