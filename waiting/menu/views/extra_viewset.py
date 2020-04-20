from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny

from menu.models.extra import Extra
from menu.serializers.extra_serializer import ExtraSerializer, ExtraStatsSerializer


class ExtraViewSet(ModelViewSet):
    queryset = Extra.objects.all()
    serializer_class = ExtraSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


class ExtraStatsViewSet(ModelViewSet):
    queryset = Extra.objects.all()
    serializer_class = ExtraStatsSerializer
    permission_classes = [AllowAny]
    http_method_names = [u'get']
