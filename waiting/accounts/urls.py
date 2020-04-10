from django.urls import include, path
from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register(r'accounts', views.UserViewSet)

app_name = 'accounts'
urlpatterns = []
