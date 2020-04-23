from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny

from menu.models.problem import Problem
from menu.serializers.problem_serializer import ProblemSerializer


class ProblemViewSet(ModelViewSet):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    permission_classes = AllowAny
