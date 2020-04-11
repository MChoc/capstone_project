import datetime
import pytz

from collections import OrderedDict

from menu.models.credit_card import CreditCard
from menu.models.food_item import FoodItem
from menu.models.transaction import Transaction
from menu.serializers.transaction_serializer import TransactionSerializer

from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.request import Request
from rest_framework.test import APITestCase, APIRequestFactory


class TestTransactionModel(APITestCase):
    """
    Testing the Transaction model and its API returns

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
        url = '/api/transaction/'
        factory = APIRequestFactory()
        request = factory.post(url)
        
        objs = Transaction.objects.all()
        serializer_context = {
            'request': Request(request),
        }
        serializer = TransactionSerializer(
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
        url = '/api/transaction/'
        factory = APIRequestFactory()
        request = factory.post(url)
        
        init_count = Transaction.objects.count()

        body = {
            'customer': reverse(
                'customuser-detail',
                args=[get_user_model().objects.get(username='Customer1').pk,],
                request=request,
            ),
            'credit_card': reverse(
                'creditcard-detail',
                args=[CreditCard.objects.get(id=1).pk,],
                request=request,
            ),
        }
        response = self.client.post(url, body, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        post_count = Transaction.objects.count()
        self.assertEqual(post_count, init_count+1)

        post_obj = Transaction.objects.get(id=post_count)
        self.assertIsNotNone(post_obj)

    """
    Testing RETRIEVE
        Retrieve a model instance.
    
    Asserts:
        200 response.
        GET data is same as in database.
    """
    def test_retrieve(self):
        url = '/api/transaction/1/'
        factory = APIRequestFactory()
        request = factory.post(url)
        
        obj = [Transaction.objects.get(id=1),]
        serializer_context = {
            'request': Request(request),
        }
        serializer = TransactionSerializer(
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
        url = '/api/transaction/1/'
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

        obj = Transaction.objects.get(id=1)
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
        url = '/api/transaction/1/'
        factory = APIRequestFactory()
        request = factory.post(url)

        credit_card = CreditCard.objects.get(id=2)
        body = {
            'credit_card': reverse(
                'creditcard-detail',
                args=[credit_card.pk,],
                request=request,
            ),
        }
        response = self.client.patch(url, body, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        obj = Transaction.objects.get(id=1)
        self.assertEqual(obj.credit_card, credit_card)

    """
    Testing DESTROY
        Destroy a model instance.
    
    Asserts:
        204 response.
        Correct object has been deleted from database.
    """
    def test_destroy(self):
        url = '/api/transaction/1/'

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertRaises(Transaction.DoesNotExist, Transaction.objects.get, id=1)

    """
    Testing adding to through model.

    Asserts:
        200 response.
        Correct object has been added related.
    """
    def test_add_food_item_through(self):
        url = '/api/transaction/1/'
        factory = APIRequestFactory()
        request = factory.post(url)

        food_item = FoodItem.objects.get(id=1)
        body = {
            'food_items': [
                reverse(
                    'fooditem-detail',
                    args=[food_item.pk,],
                    request=request,
                ),
            ],
        }
        response = self.client.patch(url, body, format='json')
        # print(response.__getstate__())
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        obj = Transaction.objects.get(id=1)
        self.assertEqual(obj.food_items.get(id=1), food_item)
