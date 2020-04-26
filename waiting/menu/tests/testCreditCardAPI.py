from collections import OrderedDict

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.request import Request
from rest_framework.test import APITestCase, APIRequestFactory

from menu.models.credit_card import CreditCard
from menu.serializers.credit_card_serializer import CreditCardSerializer


class TestCreditCardModel(APITestCase):
    """
    Testing the CreditCard model and its API returns

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
        url = '/api/credit_cards/'
        factory = APIRequestFactory()
        request = factory.get(url)

        objs = CreditCard.objects.all()
        serializer_context = {
            'request': Request(request)
        }
        serializer = CreditCardSerializer(
            objs,
            context=serializer_context,
            many=True
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
        url = '/api/credit_cards/'

        init_count = CreditCard.objects.count()

        body = {
            'number': 1234123412341239,
            'expiry_month': 1,
            'expiry_year': 2030,
            'cvv': 123
        }
        response = self.client.post(url, body, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        post_count = CreditCard.objects.count()
        self.assertEqual(post_count, init_count+1)

        post_obj = CreditCard.objects.get(number=1234123412341239)
        self.assertIsNotNone(post_obj)

    """
    Testing RETRIEVE
        Retrieve a model instance.

    Asserts:
        200 response.
        GET data is same as in database.
    """
    def test_retrieve(self):
        url = '/api/credit_cards/1/'
        factory = APIRequestFactory()
        request = factory.get(url)

        obj = [CreditCard.objects.get(id=1)]
        serializer_context = {
            'request': Request(request)
        }
        serializer = CreditCardSerializer(
            obj,
            context=serializer_context,
            many=True
        )

        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.assertEqual([OrderedDict(response.data)], serializer.data)

    """
    Testing UPDATE
        Update a model instance.

    Asserts:
        200 response.
        All fields have been changed and content is correct.
    """
    def test_update(self):
        url = '/api/credit_cards/1/'

        body = {
            'number': 1234123412341238,
            'expiry_month': 2,
            'expiry_year': 2031,
            'cvv': 124
        }
        response = self.client.put(url, body, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        obj = CreditCard.objects.get(id=1)
        self.assertEqual(obj.number, 1234123412341238)
        self.assertEqual(obj.expiry_month, 2)
        self.assertEqual(obj.expiry_year, 2031)
        self.assertEqual(obj.cvv, 124)

    """
    Testing UPDATE (partial)
        Partially update a model instance.

    Asserts:
        200 response.
        Correct field/s have been changed and content correct.
    """
    def test_partial_update(self):
        url = '/api/credit_cards/1/'

        body = {
            'number': 1234123412341238,
        }
        response = self.client.patch(url, body, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        obj = CreditCard.objects.get(id=1)
        self.assertEqual(obj.number, 1234123412341238)

    """
    Testing DESTROY
        Destroy a model instance.

    Asserts:
        204 response.
        Correct object has been deleted from database.
    """
    def test_destroy(self):
        url = '/api/credit_cards/1/'

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertRaises(
            CreditCard.DoesNotExist,
            CreditCard.objects.get,
            id=1
        )

    """
    Testing credit card validation

    Asserts:
        200 response.
        Credit card data is valid.
    """
    def test_validate(self):
        url = '/api/credit_cards/'

        init_count = CreditCard.objects.count()
        credit_card = CreditCard.objects.get(id=1)
        body = {
            'number': credit_card.number,
            'expiry_month': credit_card.expiry_month,
            'expiry_year': credit_card.expiry_year,
            'cvv': credit_card.cvv,
            'validate': True
        }
        response = self.client.get(url, body)
        # print(response.__getstate__()['_container'])
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        post_count = CreditCard.objects.count()
        self.assertTrue(response.data['validated'])
