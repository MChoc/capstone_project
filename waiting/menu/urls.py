from django.urls import include, path
from rest_framework import routers

from . import views


router = routers.DefaultRouter()
router.register(r'menus', views.MenuViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'food_items', views.FoodItemViewSet)

app_name = 'menu'
urlpatterns = [
    path('', include((router.urls, app_name)))
]
