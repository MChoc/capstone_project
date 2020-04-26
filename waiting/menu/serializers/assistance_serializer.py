from rest_framework import serializers

from menu.models.assistance import Assistance
from menu.models.problem import Problem


class AssistanceSerializer(serializers.HyperlinkedModelSerializer):

    problems = serializers.SlugRelatedField(
        queryset=Problem.objects.all(),
        many=True,
        slug_field='name'
     )

    class Meta:
        model = Assistance
        fields = ['id', 'url', 'problems', 'notes', 'resolved', 'transaction',
                  'waiter', 'date', 'date_resolved']
