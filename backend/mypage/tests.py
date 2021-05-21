from django.test import TestCase
from django.urls import reverse
from rest_framework import response
from rest_framework.test import APITestCase
from rest_framework.views import status
from .models import TestProduct, TestUser
from .serializers import UserSerializer


class TestUserProfileAPIView(APITestCase):
    def setUp(self):
        self.user = TestUser.objects.create(name='marina')
        self.user2 = TestUser.objects.create(name='kevin')

    def test_get_profile(self):
        url = reverse('mypage:profile', kwargs={'user_id':1})
        response = self.client.get(url)
        test_user = TestUser.objects.get(pk=1)
        serializer = UserSerializer(test_user)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_update_profile(self):
        url = reverse('mypage:profile', kwargs={'user_id':3})
        data = {
            'name': 'marisol'
        }
        response = self.client.put(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
