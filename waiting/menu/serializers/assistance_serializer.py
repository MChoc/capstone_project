from rest_framework import serializers

from menu.models.assistance import Assistance


class AssistanceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Assistance
        fields = ['id', 'url', 'problem', 'notes', 'resolved', 'transaction',
                  'waiter', 'date', 'date_resolved']
