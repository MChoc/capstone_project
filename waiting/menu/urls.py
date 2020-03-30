from django.urls import include, path
from rest_framework import routers

from menu.views.menu_viewset import MenuViewSet
from menu.views.category_viewset import CategoryViewSet
from menu.views.food_item_viewset import FoodItemViewSet
from menu.views.discount_viewset import DiscountViewSet
from menu.views.drink_viewset import DrinkViewSet
from menu.views.extra_viewset import ExtraViewSet
from menu.views.tag_viewset import TagViewSet
from menu.views.transaction_viewset import TransactionViewSet
from menu.views.transaction_food_item_viewset import TransactionFoodItemViewSet
from menu.views.assistance_viewset import AssistanceViewSet


router = routers.DefaultRouter()
router.register(r'menus', MenuViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'food_items', FoodItemViewSet)
router.register(r'discounts', DiscountViewSet)
router.register(r'drinks', DrinkViewSet)
router.register(r'extra', ExtraViewSet)
router.register(r'tag', TagViewSet)
router.register(r'transaction', TransactionViewSet)
router.register(r'transaction_food_item', TransactionFoodItemViewSet)
router.register(r'assistance', AssistanceViewSet)

app_name = 'menu'
urlpatterns = [
    path('', include((router.urls, app_name)))
]
