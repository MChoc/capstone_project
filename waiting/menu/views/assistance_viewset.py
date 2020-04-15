import dateutil.parser

from rest_framework.viewsets import ModelViewSet
from accounts.permissions import IsStaffOrPostOnly

from menu.models.assistance import Assistance
from menu.serializers.assistance_serializer import AssistanceSerializer


class AssistanceViewSet(ModelViewSet):
    queryset = Assistance.objects.all()
    serializer_class = AssistanceSerializer
    permission_classes = [IsStaffOrPostOnly]

    def get_queryset(self):

        start_date = self.request.query_params.get('start_date')

        if start_date:
            start_date = dateutil.parser.parse(start_date)
            return Assistance.objects.exclude(date__lt=start_date)

        return super().get_queryset()
