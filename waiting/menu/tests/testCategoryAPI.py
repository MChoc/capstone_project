from collections import OrderedDict

from menu.models.category import Category
from menu.models.category import Menu
from menu.serializers.category_serializer import CategorySerializer

from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.request import Request
from rest_framework.test import APITestCase, APIRequestFactory


class TestCategoryModel(APITestCase):
    """
    Testing the Category model and its API returns

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
        body = {'username': 'Manager1', 'password': 'Manager1'}
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
        url = '/api/categories/'
        factory = APIRequestFactory()
        request = factory.get(url)
        
        objs = Category.objects.all()
        serializer_context = {
            'request': Request(request),
        }
        serializer = CategorySerializer(
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
        url = '/api/categories/'
        factory = APIRequestFactory()
        request = factory.post(url)
        
        init_count = Category.objects.count()

        body = {
            'name': 'Test Name',
            'active': True,
            'menu': reverse(
                'menu-detail',
                args=[Menu.objects.get(id=1).pk],
                request=request,
            ),
        }
        response = self.client.post(url, body, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        post_count = Category.objects.count()
        self.assertEqual(post_count, init_count+1)

        post_obj = Category.objects.get(name='Test Name')
        self.assertIsNotNone(post_obj)

    """
    Testing RETRIEVE
        Retrieve a model instance.
    
    Asserts:
        200 response.
        GET data is same as in database.
    """
    def test_retrieve(self):
        url = '/api/categories/1/'
        factory = APIRequestFactory()
        request = factory.get(url)
        
        obj = [Category.objects.get(id=1),]
        serializer_context = {
            'request': Request(request),
        }
        serializer = CategorySerializer(
            obj,
            context=serializer_context,
            many=True,
        )

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        self.assertEqual([OrderedDict(response.data),], serializer.data)
        
    """
    Testing UPDATE
        Update a model instance.
    
    Asserts:
        200 response.
        All fields have been changed and content is correct.
    """
    def test_update(self):
        url = '/api/categories/1/'
        factory = APIRequestFactory()
        request = factory.post(url)
        
        menu = Menu.objects.create(name='Test Menu')
        body = {
            'name': 'Test Change',
            'active': False,
            'menu': reverse('menu-detail', args=[menu.pk,], request=request),
        }
        response = self.client.put(url, body, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        obj = Category.objects.get(id=1)
        self.assertEqual(obj.name, 'Test Change')
        self.assertFalse(obj.active)
        self.assertEqual(obj.menu, menu)

    """
    Testing UPDATE (partial)
        Partially update a model instance.

    Asserts:
        200 response.
        Correct field/s have been changed and content correct.
    """
    def test_partial_update(self):
        url = '/api/categories/1/'

        body = {
            'name': 'Test Change',
        }
        response = self.client.patch(url, body, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        obj = Category.objects.get(id=1)
        self.assertEqual(obj.name, 'Test Change')

    """
    Testing DESTROY
        Destroy a model instance.
    
    Asserts:
        204 response.
        Correct object has been deleted from database.
    """
    def test_destroy(self):
        url = '/api/categories/1/'

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertRaises(Category.DoesNotExist, Category.objects.get, id=1)
