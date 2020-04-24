from rest_framework.viewsets import ModelViewSet

from accounts.permissions import IsManager
from menu.models.problem import Problem
from menu.serializers.problem_serializer import ProblemSerializer


class ProblemViewSet(ModelViewSet):
    queryset = Problem.objects.all()
    serializer_class = ProblemSerializer
    permission_classes = [IsManager]
