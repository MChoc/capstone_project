from menu.models.assistance import Assistance
from menu.serializers.assistance_serializer import AssistanceSerializer

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class AssistanceViewSet(viewsets.ModelViewSet):
    queryset = Assistance.objects.all()
    serializer_class = AssistanceSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
