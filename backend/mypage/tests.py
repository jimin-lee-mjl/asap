from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework.views import status
from .models import TestProduct, TestUser
from .serializers import UserSerializer


class TestUserProfileView(APITestCase):
    def setUp(self):
        self.user = TestUser.objects.create(name='marina')

    def test_get_profile(self):
        url = reverse('mypage:profile', kwargs={'user_id': 2})
        serializer = UserSerializer(self.user)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)

    def test_update_profile(self):
        url = reverse('mypage:profile', kwargs={'user_id': 3})
        data = {
            'name': 'marisol'
        }
        response = self.client.patch(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class TestUserWishView(APITestCase):
    def setUp(self):
        self.user = TestUser.objects.create(name='marina')
        self.shirt = TestProduct.objects.create(name='shirt')
        self.user.wish.add(self.shirt)

    def test_delete_wish(self):
        url = reverse('mypage:wishlist', kwargs={'user_id': 4})
        data = {
            'name': 'shirt'
        }
        response = self.client.delete(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class TestUserBagView(APITestCase):
    def setUp(self):
        self.user = TestUser.objects.create(name='marina')
        self.shirt = TestProduct.objects.create(name='shirt')
        self.user.bag.add(self.shirt)

    def test_delete_bag(self):
        url = reverse('mypage:bag', kwargs={'user_id': 1})
        data = {
            'name': 'shirt'
        }
        response = self.client.delete(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
