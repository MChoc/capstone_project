from rest_framework import serializers

from menu.models.problem import Problem


class ProblemSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Problem
        fields = ['id', 'name']
