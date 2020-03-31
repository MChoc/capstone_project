from menu.models.extra import Extra
from menu.serializers.extra_serializer import ExtraSerializer

from rest_framework import viewsets


class ExtraViewSet(viewsets.ModelViewSet):
    queryset = Extra.objects.all()
    serializer_class = ExtraSerializer
