from menu.models.menu import Menu
from menu.models.category import Category
from menu.models.food_item import FoodItem
from menu.models.discount import Discount
from menu.models.drink import Drink
from menu.models.extra import Extra
from menu.models.tag import Tag
from menu.models.transaction import Transaction
from menu.models.transaction_food_item import TransactionFoodItem

from django.contrib import admin


admin.site.register(Menu)
admin.site.register(Category)
admin.site.register(FoodItem)
admin.site.register(Discount)
admin.site.register(Drink)
admin.site.register(Extra)
admin.site.register(Tag)
admin.site.register(Transaction)
admin.site.register(TransactionFoodItem)
