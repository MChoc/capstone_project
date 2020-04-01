from accounts.models import CustomUser
from menu.models.menu import Menu
from menu.models.category import Category
from menu.models.food_item import FoodItem
from menu.models.tag import Tag

from django.contrib.auth improt get_user_model


# ==============================================================================
# Create menu/store
menu = Menu.objects.create(name='Waiting Cafe')

# Create categories and food items/drinks
categories = []
food_items = []
drinks = []
for i in range(1,11):
    category = Category.objects.create(
        name='Category ' + str(1),
        menu=menu
    )
    categories.append(category)

    for i in range(1,11):
        if i <= 5:
            food_item = FoodItem.objects.create(
                name='Food item ' + str(i),
                price='10.00', #TODO: use rand
                description='Test description ' + str(i),
                category=category
            )
        else:
            food_item = FoodItem.objects.create(
                name='Food item ' + str(i-5),
                price='10.00', # TODO: use rand
                description='Test description ' + str(i-5),
                category=category
            )
                drink_item = Drink.objects.create(
                    food_item=food_item,
                    size='LARGE' # TODO: use rand
                )
        food_items.append(food_item)

# TODO: use rand to add tags to items
tags = []
for i in range(1,11):
    tag = Tag.objects.create(name='Tag ' + str(i))

# ==============================================================================
# Create superuser
admin = get_user_model().create_superuser('admin', password='admin')

# Populate table with managers
managers = []
for i in range(1,5):
    manager = CustomUser.objects.create(
        first_name='Manager' + str(i),
        last_name='M' + str(i),
        user_type='MANAGER'
    )

# Populate table with customers
customers = []
for i in range(1,11):
    customer = CustomUser.objects.create(
        first_name='Customer' + str(i),
        last_name='C' + str(i),
        user_type='CUSTOMER'
    )
    customers.append(customer)

# Populate table with kitchen staff
kitchens = []
for i in range(1,11):
    kitchen = CustomUser.objects.create(
        first_name='Kitchen' + str(i),
        last_name='K' + str(i),
        user_type='KITCHEN'
    )
    kitchens.append(kitchen)

# Populate table with waiters
waiters = []
for i in range(1,11):
    waiter = CustomUser.objects.create(
        first_name='Waiter' + str(i),
        last_name='W' + str(i),
        user_type='WAITER'
    )
    waiters.append(waiter)

# ==============================================================================
# Create transactions
transactions = []
for i in range(1,6):
    transaction = Transaction.objects.
