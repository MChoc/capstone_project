from menu.models.menu import Menu
from menu.models.category import Category
from menu.serializers.category_serializer import CategorySerializer

from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.request import Request
from rest_framework.test import APITestCase, APIRequestFactory


class TestFoodItemModel(APITestCase):
    @classmethod
    def setUpTestData(cls):
        fixtures = ['initial_db.json']

    def setUp(self):
        login_url = '/rest-auth/login/'
        content = {'username': 'Customer1', 'password': 'Customer1'}
        response = self.client.post(login_url, data=content, format='json')
        print(response)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + response.data['key'])

    def tearDown(self):
        logout_url = '/rest-auth/logout/'
        response = self.client.post(logout_url)

    def test_list(self):
        url = '/api/categories/'
        factory = APIRequestFactory()
        request = factory.post(url)
        
        food_items = Category.objects.all()
        serializer_context = {
            'request': Request(request)
        }
        serializer = CategorySerializer(
            food_items,
            context=serializer_context,
            many=True
        )

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
