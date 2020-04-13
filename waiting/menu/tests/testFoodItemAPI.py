from collections import OrderedDict

from menu.models.category import Category
from menu.models.food_item import FoodItem
from menu.models.tag import Tag
from menu.serializers.food_item_serializer import FoodItemSerializer

from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.request import Request
from rest_framework.test import APITestCase, APIRequestFactory


class TestFoodItemModel(APITestCase):
    """
    Testing the FoodItem model and its API returns

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
        url = '/api/food_items/'
        factory = APIRequestFactory()
        request = factory.get(url)
        
        objs = FoodItem.objects.all()
        serializer_context = {
            'request': Request(request),
        }
        serializer = FoodItemSerializer(
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
        url = '/api/food_items/'
        factory = APIRequestFactory()
        request = factory.post(url)
        
        init_count = FoodItem.objects.count()

        body = {
            'name': 'Test Name',
            'active': True,
            'price': '10.00',
            'description': 'Test Description',
            'category': reverse(
                'category-detail',
                args=[Category.objects.get(id=1).pk,],
                request=request,
            ),
            'tags' : [],
        }
        response = self.client.post(url, body, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        post_count = FoodItem.objects.count()
        self.assertEqual(post_count, init_count+1)

        post_obj = FoodItem.objects.get(name='Test Name')
        self.assertIsNotNone(post_obj)

        url = f'/api/food_items/{post_obj.pk}/'
        # print(post_obj.pk)
        factory = APIRequestFactory()
        request = factory.post(url)

        body = {
            'tags': [reverse(
                'tag-detail',
                args=[Tag.objects.get(id=1).pk,],
                request=request,
            ),]
        }
        response=self.client.patch(url, body, format='json')
        # print(response.__getstate__())
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # print(post_obj.tags)
        self.assertIsNotNone(post_obj.tags)

    """
    Testing RETRIEVE
        Retrieve a model instance.
    
    Asserts:
        200 response.
        GET data is same as in database.
    """
    def test_retrieve(self):
        url = '/api/food_items/1/'
        factory = APIRequestFactory()
        request = factory.get(url)
        
        obj = [FoodItem.objects.get(id=1),]
        serializer_context = {
            'request': Request(request),
        }
        serializer = FoodItemSerializer(
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
        url = '/api/food_items/1/'
        factory = APIRequestFactory()
        request = factory.post(url)
        
        category = Category.objects.get(id=2)
        body = {
            'name': 'Test Change',
            'active': False,
            'price': '10.00',
            'description': 'Test Change',
            'category': reverse(
                'category-detail',
                args=[category.pk,],
                request=request,
            ),
            'size': 'SMALL',
        }
        response = self.client.put(url, body, format='json')
        # print(response.__getstate__())
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        obj = FoodItem.objects.get(id=1)
        self.assertEqual(obj.name, 'Test Change')
        self.assertFalse(obj.active)
        self.assertEqual(obj.description, 'Test Change')
        self.assertEqual(obj.category, category)
        self.assertEqual(obj.size, 'SMALL')

    """
    Testing UPDATE (partial)
        Partially update a model instance.

    Asserts:
        200 response.
        Correct field/s have been changed and content correct.
    """
    def test_partial_update(self):
        url = '/api/food_items/1/'

        body = {
            'name': 'Test Change',
        }
        response = self.client.patch(url, body, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        obj = FoodItem.objects.get(id=1)
        self.assertEqual(obj.name, 'Test Change')

    """
    Testing DESTROY
        Destroy a model instance.
    
    Asserts:
        204 response.
        Correct object has been deleted from database.
    """
    def test_destroy(self):
        url = '/api/food_items/1/'

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertRaises(FoodItem.DoesNotExist, FoodItem.objects.get, id=1)

    """
    Testing adding to through model.

    Asserts:
        200 response.
        Correct object has been added related.
    """
    def test_add_tags_through(self):
        url = '/api/food_items/1/'
        factory = APIRequestFactory()
        request = factory.post(url)

        tag = Tag.objects.get(id=1)
        body = {
            'tags': [
                reverse(
                    'tag-detail',
                    args=[tag.pk,],
                    request=request,
                ),
            ],
        }
        response = self.client.patch(url, body, format='json')
        # print(response.__getstate__())
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        obj = FoodItem.objects.get(id=1)
        self.assertEqual(obj.tags.get(id=1), tag)
