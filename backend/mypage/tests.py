from django.test import TestCase
from django.urls import reverse
from rest_framework import response
from rest_framework.test import APITestCase
from rest_framework.views import status
from .models import TestProduct, TestUser
from .serializers import UserSerializer


class TestUserProfileView(APITestCase):
    def setUp(self):
        self.user = TestUser.objects.create(name='marina')
        self.user2 = TestUser.objects.create(name='kevin')

    def test_get_profile(self):
        url = reverse('mypage:profile', kwargs={'user_id':3})
        test_user = TestUser.objects.get(pk=3)
        serializer = UserSerializer(test_user)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_update_profile(self):
        url = reverse('mypage:profile', kwargs={'user_id':5})
        data = {
            'name': 'marisol'
        }
        response = self.client.put(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class TestUserHistoryView(APITestCase):
    def setUp(self):
        self.user = TestUser.objects.create(name='marina')
        self.user2 = TestUser.objects.create(name='kevin')

    def test_get_hitory(self):
        url = reverse('mypage:history', kwargs={'user_id':1})
        test_user = TestUser.objects.get(pk=1)
        serializer = UserSerializer(test_user)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)


class TestUserWishListView(APITestCase):
    def setUp(self):
        self.user = TestUser.objects.create(name='marina')
        self.user2 = TestUser.objects.create(name='kevin')

    def test_get_wish(self):
        url = reverse('mypage:wish', kwargs={'user_id':1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
