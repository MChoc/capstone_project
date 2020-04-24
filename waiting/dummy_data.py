import csv
from random import randint, choices
from datetime import datetime, timedelta
import warnings

from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist

from menu.models.assistance import Assistance
from menu.models.category import Category
from menu.models.credit_card import CreditCard
from menu.models.discount import Discount
from menu.models.extra import Extra
from menu.models.food_item import FoodItem
from menu.models.menu import Menu
from menu.models.problem import Problem
from menu.models.tag import Tag
from menu.models.transaction import Transaction
from menu.models.transaction_food_item import TransactionFoodItem


warnings.filterwarnings("ignore")

# =============================================================================
# Create menu/store
menu = Menu.objects.create(name='Cafe Menu')
print(f"Created {menu}")

# Create categories and food items and extras
categories = []
food_items = []
extras = []
extras_with_categories = {}

with open('example_data/categories.csv') as f:
    reader = csv.reader(f)
    for row in reader:
        menu = Menu.objects.get(name=row[2])
        category = Category.objects.create(
            name=row[0],
            active=row[1] == 'yes',
            menu=menu
        )
        categories.append(category)
        print(f"Created {category}")

with open('example_data/food_items.csv') as f:
    reader = csv.reader(f)
    for row in reader:
        food_item = FoodItem.objects.create(
            name=row[0],
            active=row[1] == 'yes',
            price=row[2],
            description=row[3],
            category=Category.objects.get(name=row[4]),
            size=row[5]
        )
        food_items.append(food_item)
        print(f"Created {food_item}")

with open('example_data/extras.csv') as f:
    reader = csv.DictReader(f)
    for row in reader:

        extra = Extra.objects.create(
            name=row['name'],
            active=row['active'] == 'yes',
            price=row['price'],
            category=Category.objects.get(name=row['category'])
        )

        if row['category'] not in extras_with_categories:
            extras_with_categories[row['category']] = [extra]
        else:
            extras_with_categories[row['category']].append(extra)

        extras.append(extra)
        print(f"Created {extra}")


# Create custom users
managers = []
customers = []
kitchens = []
waiters = []
with open('example_data/users.csv') as f:
    reader = csv.reader(f)
    for row in reader:
        if row[5] == 'MANAGER':
            managers.append(get_user_model().objects.create_superuser(
                username=row[0],
                password=row[1],
                first_name=row[3],
                last_name=row[4],
                user_type=row[5],
                active=row[6] == 'yes'
            ))
        elif row[5] == 'CUSTOMER':
            customers.append(get_user_model().objects.create_user(
                username=row[0],
                password=row[1],
                first_name=row[3],
                last_name=row[4],
                user_type=row[5],
                active=row[6] == 'yes'
            ))
        elif row[5] == 'KITCHEN':
            kitchens.append(get_user_model().objects.create_user(
                username=row[0],
                password=row[1],
                first_name=row[3],
                last_name=row[4],
                user_type=row[5],
                active=row[6] == 'yes'
            ))
        else:
            waiters.append(get_user_model().objects.create_user(
                username=row[0],
                password=row[1],
                first_name=row[3],
                last_name=row[4],
                user_type=row[5],
                active=row[6] == 'yes'
            ))

print("created custom users")

# =============================================================================
# Create discounts including default zero
discounts = []
for i in range(0, 5):
    discount = Discount.objects.create(
        name=str(i * 10) + '%',
        amount=i * 10,
        type='PERCENTAGE'
    )
    discounts.append(discount)
    print(f"Created {discount}")

# Create credit cards
credit_cards = []
for i in range(0, 5):
    credit_card = CreditCard.objects.create(
        number='123412341234123' + str(i+1),
        expiry_month='0' + str(i+1),
        expiry_year='202' + str(i+1),
        cvv='12' + str(i+1)
    )
    credit_cards.append(credit_card)
    print(f"Created {credit_card}")

# Create transactions
transactions = []
for i in range(50):

    prepared = False
    active = True

    if i < 25:
        prepared = True
        active = False
    elif i < 38:
        prepared = True
        active = True

    transaction = Transaction.objects.create(
        credit_card=credit_cards[0],
        prepared=prepared,
        active=active
    )
    transactions.append(transaction)
    print(f"Created {transaction}")

    # add between 1 and 5 food items to the list
    random_food_items = choices(food_items, k=randint(1, 5))

    transaction.food_items.set(random_food_items, through_defaults={
        'discount': discounts[0]
    })

    tfi_set = TransactionFoodItem.objects.filter(transaction=transaction.pk)

    for tfi in tfi_set:

        category_name = tfi.food_item.category.name
        # pick relevant extras for each category food is in

        extra_list = extras_with_categories[category_name]
        if category_name == 'Hot Drinks' or category_name == 'Cold Drinks':
            tfi.extras.add(extra_list[randint(0, len(extra_list) - 1)])
        else:
            # add between 0 and 2 extras per food item
            for i in range(randint(0, 2)):
                tfi.extras.add(extra_list[randint(0, len(extra_list) - 1)])

        # Call save to force price calculation
        tfi.save()

assistances = []

with open('example_data/assistance.csv') as f:
    reader = csv.DictReader(f)
    for row in reader:

        if int(row['custom']):
            num_requests = randint(1, 3)
        else:
            num_requests = randint(1, 20)
        for i in range(num_requests):
            assistance = Assistance.objects.create(
                waiter=waiters[randint(0, len(waiters) - 1)],
                resolved=True
            )
            try:
                problem = Problem.objects.get(
                    name=row['request'],
                )
            except ObjectDoesNotExist:
                problem = Problem.objects.create(
                    name=row['request'],
                )

            assistance.problems.add(problem)
            # create dummy resolved time
            updated_timestamp = datetime.utcnow() + timedelta(minutes=(randint(1, 5)))
            Assistance.objects.filter(pk=assistance.pk).update(date_resolved=updated_timestamp)
            assistances.append(assistance)

    # unresolve 5 requests
    num_to_jump = int(len(assistances) / 5)
    for i in range(5):
        request = assistances[i * num_to_jump]
        Assistance.objects.filter(pk=request.pk).update(resolved=False, date_resolved=None)

    print('Created Assistance Requests')
