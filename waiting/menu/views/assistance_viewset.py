from datetime import datetime

import dateutil.parser
from pytz import utc
from accounts.permissions import IsStaffOrPostOnly, IsManager
from django.db.models import Count, Avg, F, ExpressionWrapper, fields, Avg
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response

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

    """
    Overriding the update method to automatically generate date when assistance
    request was resolved.

    Checks if the truth status of resolved has changed.
        If true -> false, null date_resolved field.
        If false -> true, make date_resolved now.
    """
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        resolve_status = request.data.get('resolved')
        if instance.resolved and resolve_status is False:
            request.data['date_resolved'] = None
        elif not instance.resolved and resolve_status:
            request.data['date_resolved'] = datetime.now(utc).isoformat()
        return super().update(request, *args, **kwargs)


class AssistanceStatsViewSet(ModelViewSet):
    queryset = Assistance.objects.all()
    serializer_class = AssistanceSerializer
    http_method_names = [u'get']
    permission_classes = [IsManager]

    def list(self, request, *args, **kwargs):
        """
        param:'waiters': 'true':
        returns: list of all waiters who have resolved assistance requests and
                 the total requests resolved

        param: 'average_time': 'true'
        returns: average time (in seconds) it takes to resolve an assistance
                 request

        param: None
        returns: List of all assistance requests in order of most to least
                 requested
        """
        if request.query_params.get('waiters'):
            response = Assistance.objects.filter(resolved=True) \
                .values('waiter__username') \
                .annotate(total_resolved=Count('waiter__username')) \
                .order_by('-total_resolved')
        elif request.query_params.get("average_time"):
            duration = ExpressionWrapper(
                F('date_resolved') - F('date'),
                output_field=fields.DurationField()
            )
            response = Assistance.objects.filter(resolved=True).annotate(
                duration=duration
            ).aggregate(average_time=Avg(duration))
        else:
            response = Assistance.objects.values("problem").annotate(
                total_requests=Count('problem')
            ).order_by('-total_requests')
        return Response(response)
