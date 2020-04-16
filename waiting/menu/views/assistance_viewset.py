import dateutil.parser
from accounts.permissions import IsStaffOrPostOnly
from rest_framework.viewsets import ModelViewSet

from menu.models.assistance import Assistance
from menu.serializers.assistance_serializer import AssistanceSerializer


class AssistanceViewSet(ModelViewSet):
    queryset = Assistance.objects.all()
    serializer_class = AssistanceSerializer
    permission_classes = [IsStaffOrPostOnly]

    """
    Overriding the get_queryset method to allow for listing only trasnactions
    after a given date.

    Checks if the 'start_date' field exists and is set to True.
        If it exists, return only a list of transactions after start_date.
        Else execute default get_queryset method.
    """
    def get_queryset(self):
        start_date = self.request.query_params.get('start_date')
        if start_date:
            return Assistance.objects.exclude(
                date__lt=dateutil.parser.parse(start_date)
            )
        return super().get_queryset()
