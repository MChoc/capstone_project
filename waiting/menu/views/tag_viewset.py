from menu.models.tag import Tag
from menu.serializers.tag_serializer import TagSerializer

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

