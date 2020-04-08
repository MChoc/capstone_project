from menu.models.menu import Menu
from menu.models.category import Category
from menu.models.food_item import FoodItem
from menu.models.discount import Discount
from menu.models.extra import Extra
from menu.models.tag import Tag
from menu.models.transaction import Transaction
from menu.models.transaction_food_item import TransactionFoodItem
from menu.models.assistance import Assistance
from menu.models.credit_card import CreditCard

from django.contrib.auth import get_user_model


# ==============================================================================
# Create menu/store
menu = Menu.objects.create(name='Waiting Cafe')
print(f"Created {menu}")

# Create categories and food items and extras
categories = []
food_items = []
extras = []
for i in range(0,10):
    category = Category.objects.create(
        name='Category ' + str(1),
        menu=menu
    )
    categories.append(category)
    print(f"Created {category}")

    for i in range(0,10):
        if i <= 5:
            food_item = FoodItem.objects.create(
                name='Food item ' + str(i),
                price='10.00', #TODO: use rand
                description='Test description ' + str(i),
                category=category
            )
        else:
            food_item = FoodItem.objects.create(
                name='Drink ' + str(i-5),
                price='10.00', # TODO: use rand
                description='Test description ' + str(i-5),
                category=category,
                size='LARGE'
            )
        food_items.append(food_item)
        print(f"Created {food_item}")

        for i in range(0,10):
            extra = Extra.objects.create(
                name='Extra ' + str(i),
                price=i,
                category=category
            )
            extras.append(extra)
            print(f"Created {extra}")

# TODO: use rand to add tags to items
tags = []
for i in range(0,10):
    tag = Tag.objects.create(name='Tag ' + str(i))
    tags.append(tag)
    print(f"Created {tag}")

# ==============================================================================
# Create superuser
admin = get_user_model().objects.create_superuser('admin', password='admin')
print("Created admin")

# Populate table with managers
managers = []
for i in range(1,5):
    manager = get_user_model().objects.create_superuser(
        username='Manager' + str(i),
        password='Manager' + str(i),
        first_name='Manager' + str(i),
        last_name='M' + str(i),
        user_type='MANAGER'
    )
    managers.append(manager)
    print(f"Created {manager}")

# Populate table with customers
customers = []
for i in range(0,10):
    customer = get_user_model().objects.create_user(
        username='Customer' + str(i),
        password='Customer' + str(i),
        first_name='Customer' + str(i),
        last_name='C' + str(i),
        user_type='CUSTOMER'
    )
    customers.append(customer)
    print(f"Created {customer}")

# Populate table with kitchen staff
kitchens = []
for i in range(0,10):
    kitchen = get_user_model().objects.create_user(
        username='Kitchen' + str(i),
        password='Kitchen' + str(i),
        first_name='Kitchen' + str(i),
        last_name='K' + str(i),
        user_type='KITCHEN'
    )
    kitchens.append(kitchen)
    print(f"Created {kitchen}")

# Populate table with waiters
waiters = []
for i in range(0,10):
    waiter = get_user_model().objects.create_user(
        username='Waiter' + str(i),
        password='Waiter' + str(i),
        first_name='Waiter' + str(i),
        last_name='W' + str(i),
        user_type='WAITER'
    )
    waiters.append(waiter)
    print(f"Created {waiter}")

# ==============================================================================
# Create discounts including default zero
discounts = []
for i in range(0,5):
    discount = Discount.objects.create(
        name=str(i * 10) + '%',
        amount=i * 10,
        discount='PERCENTAGE'
    )
    discounts.append(discount)
    print(f"Created {discount}")

# Create credit cards
credit_cards = []
for i in range(0,5):
    credit_card = CreditCard.objects.create(
        number='123412341234123' + str(i),
        expiry_month='0' + str(i),
        expiry_year='0' + str(i),
        cvs='12' + str(i)
    )
    credit_cards.append(credit_card)
    print(f"Created {credit_card}")

# Create transactions
transactions = []
for i in range(0,5):
    transaction = Transaction.objects.create(
        # TODO: randomise customer and credit card
        customer=customers[i],
        credit_card=credit_cards[i]
    )
    transactions.append(transaction)

    # TODO: create list of random food items of random length
    # TODO: apply random discount
    # TODO: apply random extras
    j = i * 5
    transaction.food_items.set(food_items[j:j+5], through_defaults={
        'discount': discounts[i]
    })
    print(f"Created {transaction}")

assistances = []
for i in range(0,5):
    assistance = Assistance.objects.create(
        transaction=transactions[i],
        waiter=waiters[i],
        problem='Problem ' + str(i),
        notes='Notes ' + str(i),
    )
    assistances.append(assistance)
    print(f'Created {assistance}')
