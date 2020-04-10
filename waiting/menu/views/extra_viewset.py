from menu.models.extra import Extra
from menu.serializers.extra_serializer import ExtraSerializer

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class ExtraViewSet(viewsets.ModelViewSet):
    queryset = Extra.objects.all()
    serializer_class = ExtraSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
