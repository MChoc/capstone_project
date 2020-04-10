from menu.models.assistance import Assistance

from rest_framework import serializers


class AssistanceSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Assistance
        fields = [
            'id',
            'url',
            'problem',
            'notes',
            'resolved',
            'transaction',
            'waiter'
        ]
