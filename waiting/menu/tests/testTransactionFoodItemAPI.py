import datetime
import pytz

from collections import OrderedDict

from menu.models.credit_card import CreditCard
from menu.models.extra import Extra
from menu.models.food_item import FoodItem
from menu.models. transaction import Transaction
from menu.models.transaction_food_item import TransactionFoodItem
from menu.serializers.transaction_food_item_serializer import TransactionFoodItemSerializer

from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.request import Request
from rest_framework.test import APITestCase, APIRequestFactory


class TestTransactionFoodItemModel(APITestCase):
    """
    Testing the TransactionFoodItem model and its API returns

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
        url = '/api/transaction_food_item/'
        factory = APIRequestFactory()
        request = factory.post(url)
        
        objs = TransactionFoodItem.objects.all()
        serializer_context = {
            'request': Request(request),
        }
        serializer = TransactionFoodItemSerializer(
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
        url = '/api/transaction_food_item/'
        factory = APIRequestFactory()
        request = factory.post(url)
        
        init_count = TransactionFoodItem.objects.count()
        body = {
            'transaction': reverse(
                'transaction-detail',
                args=[Transaction.objects.get(id=1).pk,],
                request=request,
            ),
            'food_item': reverse(
                'fooditem-detail',
                args=[FoodItem.objects.get(id=10).pk,],
                request=request,
            ),
        }
        response = self.client.post(url, body, format='json')
        # print(response.__getstate__())
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        post_count = TransactionFoodItem.objects.count()
        self.assertEqual(post_count, init_count+1)

        post_obj = TransactionFoodItem.objects.get(id=post_count)
        self.assertIsNotNone(post_obj)

    """
    Testing RETRIEVE
        Retrieve a model instance.
    
    Asserts:
        200 response.
        GET data is same as in database.
    """
    def test_retrieve(self):
        url = '/api/transaction_food_item/1/'
        factory = APIRequestFactory()
        request = factory.post(url)
        
        obj = [TransactionFoodItem.objects.get(id=1),]
        serializer_context = {
            'request': Request(request),
        }
        serializer = TransactionFoodItemSerializer(
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
        url = '/api/transaction_food_item/1/'
        factory = APIRequestFactory()
        request = factory.post(url)
        
        customer = get_user_model().objects.get(username='Customer1')
        credit_card = CreditCard.objects.get(id=1)
        body = {
            'active': False,
            'customer': reverse(
                'customuser-detail',
                args=[customer.pk,],
                request=request,
            ),
            'credit_card': reverse(
                'creditcard-detail',
                args=[credit_card.pk,],
                request=request,
            ),
        }
        response = self.client.put(url, body, format='json')
        # print(response.__getstate__())
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        obj = TransactionFoodItem.objects.get(id=1)
        self.assertFalse(obj.active)
        self.assertEqual(obj.customer, customer)
        self.assertEqual(obj.credit_card, credit_card)

    """
    Testing UPDATE (partial)
        Partially update a model instance.

    Asserts:
        200 response.
        Correct field/s have been changed and content correct.
    """
    def test_partial_update(self):
        url = '/api/transaction_food_item/1/'
        factory = APIRequestFactory()
        request = factory.post(url)

        extra = Extra.objects.get(id=2)
        body = {
            'extras': reverse(
                'extra-detail',
                args=[extra.pk,],
                request=request,
            ),
        }
        response = self.client.patch(url, body, format='json')
        # print(response.__getstate__())
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        obj = TransactionFoodItem.objects.get(id=1)
        self.assertEqual(obj.extras, extra)

    """
    Testing DESTROY
        Destroy a model instance.
    
    Asserts:
        204 response.
        Correct object has been deleted from database.
    """
    def test_destroy(self):
        url = '/api/transaction_food_item/1/'

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertRaises(TransactionFoodItem.DoesNotExist, TransactionFoodItem.objects.get, id=1)
