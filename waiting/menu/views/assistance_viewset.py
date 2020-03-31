from menu.models.assistance import Assistance
from menu.serializers.assistance_serializer import AssistanceSerializer

from rest_framework import viewsets


class AssistanceViewSet(viewsets.ModelViewSet):
    queryset = Assistance.objects.all()
    serializer_class = AssistanceSerializer
