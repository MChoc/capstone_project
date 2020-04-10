from rest_framework import viewsets, permissions

from . import serializers
from .models import CustomUser


class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = serializers.UserSerializer
