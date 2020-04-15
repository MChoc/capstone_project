from rest_framework.viewsets import ModelViewSet
from accounts.permissions import IsStaffOrPostOnly

from menu.models.assistance import Assistance
from menu.serializers.assistance_serializer import AssistanceSerializer


class AssistanceViewSet(ModelViewSet):
    queryset = Assistance.objects.all()
    serializer_class = AssistanceSerializer
    permission_classes = [IsStaffOrPostOnly]
