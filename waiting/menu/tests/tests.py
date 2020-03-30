from waiting.menu import models

from django.test import TestCase


class TestFoodItemModel(TestCase):
    @classmethod
    def setUpTestData(cls):
        menu = models.Category.objects.create(
            name='Waiting Cafe'
        )

        category = models.Category.objects.create(
            name='Drinks',
            menu=menu
        )

        food_item = models.FoodItem.objects.create(
            name='Cappuccino',
            price=5.00,
            category=category
        )

    def setUp(self):
        pass

    def tearDown(self):
        pass

    def test_name_label(self):
        food_item = models.FoodItem.objects.get(id=1)
        field_label = food_item._meta.get_field('name').verbose_name
        self.assertEqual(field_label)
