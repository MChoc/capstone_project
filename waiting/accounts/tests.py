from collections import OrderedDict

from accounts.models import CustomUser
from accounts.serializers import UserSerializer

from rest_framework import status, reverse
from rest_framework.request import Request
from rest_framework.test import APITestCase, APIRequestFactory


class TestCustomUserModel(APITestCase):
    """
    Testing the CustomUser model and its API returns

    FYI
        GET: LIST/RETRIEVE
        POST: CREATE
        PUT/PATCH: UPDATE
        DELETE: DESTROY

    LIST:
        Lists a queryset.

    RETRIEVE:
        Retrieve a model instance.

    CREATE:
        Create a model instance.

    UPDATE:
        Update a model instance.

    DESTROY:
        Destroy a model instance.
    """
    fixtures = ['dump.json']

    def setUp(self):
        login_url = '/rest-auth/login/'
        body = {'username': 'Manager2', 'password': 'Manager2'}
        response = self.client.post(login_url, body, format='json')
        self.client.credentials(
            HTTP_AUTHORIZATION='Token ' + response.data['key']
        )

    def tearDown(self):
        logout_url = '/rest-auth/logout/'
        self.client.post(logout_url)

    """
    Testing LIST:
        Lists a queryset.

    Checks for:
        200 response.
        GET data is same as database data.
    """
    def test_list(self):
        url = '/api/accounts/'
        factory = APIRequestFactory()
        request = factory.post(url)

        objs = CustomUser.objects.all()
        serializer_context = {
            'request': Request(request),
        }
        serializer = UserSerializer(
            objs,
            context=serializer_context,
            many=True,
        )

        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    """
    Testing CREATE
        Create a model instance.

    Asserts:
        201 response.
        Object count increased.
        Object exists in database.
    """
    def test_create(self):
        url = '/api/accounts/'

        init_count = CustomUser.objects.count()

        body = {
            'username': 'Testusername',
            'password': 'Testpassword',
            'first_name': 'Test first name',
            'last_name': 'Test last name',
            'user_type': 'MANAGER',
        }
        response = self.client.post(url, body, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        post_count = CustomUser.objects.count()
        self.assertEqual(post_count, init_count+1)

        post_obj = CustomUser.objects.get(username='Testusername')
        self.assertIsNotNone(post_obj)

    """
    Testing RETRIEVE
        Retrieve a model instance.

    Asserts:
        200 response.
        GET data is same as in database.
    """
    def test_retrieve(self):
        url = '/api/accounts/1/'
        factory = APIRequestFactory()
        request = factory.post(url)

        obj = [CustomUser.objects.get(id=1), ]
        serializer_context = {
            'request': Request(request),
        }
        serializer = UserSerializer(
            obj,
            context=serializer_context,
            many=True,
        )

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual([OrderedDict(response.data), ], serializer.data)

    """
    Testing UPDATE
        Update a model instance.

    Asserts:
        200 response.
        All fields have been changed and content is correct.
    """
    def test_update(self):
        url = '/api/accounts/1/'

        body = {
            'username': 'Testusernamechange',
            'first_name': 'Test first name change',
            'last_name': 'Test last name change',
            'user_type': 'WAITER',
        }
        response = self.client.put(url, body, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        obj = CustomUser.objects.get(id=1)
        self.assertEqual(obj.username, 'Testusernamechange')
        self.assertEqual(obj.first_name, 'Test first name change')
        self.assertEqual(obj.last_name, 'Test last name change')
        self.assertEqual(obj.user_type, 'WAITER')

    """
    Testing UPDATE (partial)
        Partially update a model instance.

    Asserts:
        200 response.
        Correct field/s have been changed and content correct.
    """
    def test_partial_update(self):
        url = '/api/accounts/1/'

        body = {
            'active': False,
        }
        response = self.client.patch(url, body, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        obj = CustomUser.objects.get(id=1)
        self.assertFalse(obj.active)

    """
    Testing DESTROY
        Destroy a model instance.

    Asserts:
        204 response.
        Correct object has been deleted from database.
    """
    def test_destroy(self):
        url = '/api/accounts/1/'

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertRaises(
            CustomUser.DoesNotExist,
            CustomUser.objects.get,
            id=1
        )
