from rest_framework.viewsets import ModelViewSet

from accounts import serializers, models


class UserViewSet(ModelViewSet):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer
