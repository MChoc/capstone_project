from menu.models.menu import Menu
from menu.serializers.menu_serializer import MenuSerializer

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.request import Request
from rest_framework.test import APITestCase, APIRequestFactory


class TestMenuModel(APITestCase):
    """
    Testing the Menu model and its API returns.

    Equivalent terminology to REST:
        GET: LIST/RETRIEVE
        POST: CREATE
        PUT/PATCH: UPDATE
        DELETE: DESTROY
    """
    fixtures = ['dump.json']

    def setUp(self):
        login_url = '/rest-auth/login/'
        content = {'username': 'Customer0', 'password': 'Customer0'}
        response = self.client.post(login_url, content, format='json')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + response.data['key'])

    def tearDown(self):
        logout_url = '/rest-auth/logout/'
        response = self.client.post(logout_url)

    """
    Testing LIST:
        Lists a queryset.
    
    Asserts
        A 200 response.
        GET data is same as database data.
    """
    def test_list(self):
        url = '/api/menus/'
        factory = APIRequestFactory()
        request = factory.post(url)
        
        food_items = Menu.objects.all()
        serializer_context = {
            'request': Request(request)
        }
        serializer = MenuSerializer(
            food_items,
            context=serializer_context,
            many=True
        )

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)
