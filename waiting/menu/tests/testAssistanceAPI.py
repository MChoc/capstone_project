from collections import OrderedDict

from menu.models.assistance import Assistance
from menu.models.transaction import Transaction
from menu.serializers.assistance_serializer import AssistanceSerializer

from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.request import Request
from rest_framework.test import APITestCase, APIRequestFactory


class TestCategoryModel(APITestCase):
    """
    Testing the Assistance model and its API returns

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
        url = '/api/assistance/'
        factory = APIRequestFactory()
        request = factory.post(url)
        
        objs = Assistance.objects.all()
        serializer_context = {
            'request': Request(request),
        }
        serializer = AssistanceSerializer(
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
        url = '/api/assistance/'
        factory = APIRequestFactory()
        request = factory.post(url)
        
        init_count = Assistance.objects.count()

        body = {
            'transaction': reverse(
                'transaction-detail',
                args=[Transaction.objects.get(id=1).pk],
                request=request,
            ),
            'waiter': reverse(
                'customuser-detail',
                args=[get_user_model().objects.get(username='Waiter1').pk],
                request=request,
            ),
            'problem': 'Test problem',
            'notes': '',
        }
        response = self.client.post(url, body, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        post_count = Assistance.objects.count()
        self.assertEqual(post_count, init_count+1)

        post_obj = Assistance.objects.get(problem='Test problem')
        self.assertIsNotNone(post_obj)

    """
    Testing RETRIEVE
        Retrieve a model instance.
    
    Asserts:
        200 response.
        GET data is same as in database.
    """
    def test_retrieve(self):
        url = '/api/assistance/1/'
        factory = APIRequestFactory()
        request = factory.post(url)
        
        obj = [Assistance.objects.get(id=1),]
        serializer_context = {
            'request': Request(request),
        }
        serializer = AssistanceSerializer(
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
        url = '/api/assistance/1/'
        factory = APIRequestFactory()
        request = factory.post(url)
        
        transaction = Transaction.objects.get(id=2)
        waiter = get_user_model().objects.get(username='Waiter2')
        body = {
            'transaction': reverse(
                'transaction-detail',
                args=[transaction.pk,],
                request=request,
            ),
            'waiter': reverse(
                'customuser-detail',
                args=[waiter.pk,],
                request=request,
            ),
            'problem': 'Test Change',
            'notes': 'Test Change',
            'resolved': True,
        }
        response = self.client.put(url, body, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        obj = Assistance.objects.get(id=1)
        self.assertEqual(obj.transaction, transaction)
        self.assertEqual(obj.waiter, waiter)
        self.assertEqual(obj.problem, 'Test Change')
        self.assertEqual(obj.notes, 'Test Change')
        self.assertTrue(obj.resolved)

    """
    Testing UPDATE (partial)
        Partially update a model instance.

    Asserts:
        200 response.
        Correct field/s have been changed and content correct.
    """
    def test_partial_update(self):
        url = '/api/assistance/1/'
        factory = APIRequestFactory()
        request = factory.post(url)

        body = {
            'notes': 'Test Change',
            'resolved': True,
        }
        response = self.client.patch(url, body, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        obj = Assistance.objects.get(id=1)
        self.assertEqual(obj.notes, 'Test Change')

    """
    Testing DESTROY
        Destroy a model instance.
    
    Asserts:
        204 response.
        Correct object has been deleted from database.
    """
    def test_destroy(self):
        url = '/api/assistance/1/'

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertRaises(Assistance.DoesNotExist, Assistance.objects.get, id=1)
