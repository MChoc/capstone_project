from menu.models.tag import Tag
from menu.serializers.tag_serializer import TagSerializer

from rest_framework import viewsets


class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
