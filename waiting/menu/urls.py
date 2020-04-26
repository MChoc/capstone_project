from django.urls import include, path
from rest_framework import routers

from menu.views.menu_viewset import MenuViewSet
from menu.views.category_viewset import CategoryViewSet, CategoryStatsViewSet
from menu.views.food_item_viewset import FoodItemViewSet, FoodItemStatsViewSet
from menu.views.discount_viewset import DiscountViewSet
from menu.views.extra_viewset import ExtraViewSet, ExtraStatsViewSet
from menu.views.tag_viewset import TagViewSet
from menu.views.transaction_viewset import TransactionViewSet
from menu.views.transaction_food_item_viewset import TransactionFoodItemViewSet
from menu.views.assistance_viewset import AssistanceViewSet
from menu.views.assistance_viewset import AssistanceStatsViewSet
from menu.views.credit_card_viewset import CreditCardViewSet
from menu.views.problem_viewset import ProblemViewSet


router = routers.DefaultRouter()
router.register(r'menus', MenuViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'categories_stats', CategoryStatsViewSet)
router.register(r'food_items', FoodItemViewSet)
router.register(r'food_items_stats', FoodItemStatsViewSet)
router.register(r'discounts', DiscountViewSet)
router.register(r'extra', ExtraViewSet)
router.register(r'extra_stats', ExtraStatsViewSet)
router.register(r'tag', TagViewSet)
router.register(r'transaction', TransactionViewSet)
router.register(r'transaction_food_item', TransactionFoodItemViewSet)
router.register(r'assistance', AssistanceViewSet)
router.register(r'assistance_stats', AssistanceStatsViewSet)
router.register(r'credit_cards', CreditCardViewSet)
router.register(r'problem', ProblemViewSet)


app_name = 'menu'
urlpatterns = []
