from menu import models, serializers

from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.request import Request
from rest_framework.test import APITestCase, APIRequestFactory


class TestFoodItemModel(APITestCase):
    @classmethod
    def setUpTestData(cls):
        menu = models.Menu.objects.create(
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

        user = User.objects.create_user('user', '', 'user')

    def setUp(self):
        login_url = '/rest-auth/login/'
        content = {'username': 'user', 'password': 'user'}
        response = self.client.post(login_url, data=content, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + response.data['key'])

    def tearDown(self):
        logout_url = '/rest-auth/logout/'
        response = self.client.post(logout_url)

    def test_list(self):
        url = '/api/categories/'
        factory = APIRequestFactory()
        request = factory.post(url)
        
        food_items = models.Category.objects.all()
        serializer_context = {
            'request': Request(request)
        }
        serializer = serializers.CategorySerializer(
            food_items,
            context=serializer_context,
            many=True
        )

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
