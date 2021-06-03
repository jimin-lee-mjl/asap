from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework.views import status
from datetime import datetime
from .serializers import UserSerializer
from accounts.models import User
from .models import OrderDetail
from recommend.models import Keyword, Item


class TestUserDetailListView(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            email='testuser@test.com',
            password='hello123',
            address='Tamatea, Napier, NZ'
        )

    def test_get_detail(self):
        url = reverse('mypage:detail', kwargs={'user_id': 6})
        serializer = UserSerializer(self.user)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)


class TestUserProfileUpdateView(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            email='testuser@test.com',
            password='hello123',
            address='Tamatea, Napier, NZ'
        )

    def test_patch_profile(self):
        url = reverse('mypage:profile', kwargs={'user_id': 7})
        data = {
            'password': 'marisol1234'
        }
        response = self.client.patch(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class TestLikeItemUpdateView(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            email='testuser@test.com',
            password='hello123',
            address='Tamatea, Napier, NZ'
        )
        self.keyword = Keyword.objects.create(
            name='sporty'
        )
        self.item = Item.objects.create(
            asin='1039746',
            title='blue cap',
            price=10.00,
            is_women=True,
            category='top'
        )
        self.item2 = Item.objects.create(
            asin='BB0091',
            title='white hat',
            price=20.00,
            is_women=False,
            category='etc'
        )
        self.item.keywords.add(self.keyword)
        self.user.keywords.add(self.keyword)
        self.user.like_items.add(self.item)

    def test_post_like_item(self):
        url = reverse('mypage:like', kwargs={'user_id': 4})
        data = {
            'asin': self.item2.asin
        }
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_del_like_item(self):
        url = reverse('mypage:like', kwargs={'user_id': 3})
        data = {
            'asin': self.item.asin
        }
        response = self.client.delete(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class TestCartItemUpdateView(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            email='testuser@test.com',
            password='hello123',
            address='Tamatea, Napier, NZ'
        )
        self.keyword = Keyword.objects.create(
            name='sporty'
        )
        self.item = Item.objects.create(
            asin='1039746',
            title='blue cap',
            price=10.00,
            is_women=True,
            category='top'
        )
        self.item2 = Item.objects.create(
            asin='BB0091',
            title='white hat',
            price=20.00,
            is_women=False,
            category='etc'
        )
        self.item.keywords.add(self.keyword)
        self.user.keywords.add(self.keyword)
        self.user.cart_items.add(self.item)

    def test_post_cart_item(self):
        url = reverse('mypage:cart', kwargs={'user_id': 2})
        data = {
            'asin': self.item2.asin
        }
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_del_cart_item(self):
        url = reverse('mypage:cart', kwargs={'user_id': 1})
        data = {
            'asin': self.item.asin
        }
        response = self.client.delete(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class TestOrderDetailListView(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            email='testuser@test.com',
            password='hello123',
            address='Tamatea, Napier, NZ'
        )
        self.keyword = Keyword.objects.create(
            name='sporty'
        )
        self.item = Item.objects.create(
            asin='1039746',
            title='blue cap',
            price=10.00,
            is_women=True,
            category='top'
        )
        self.order = OrderDetail.objects.create(
            user_id=self.user,
            ordered_at=datetime.now(),
            total_price=50.00
        )
        self.item.keywords.add(self.keyword)
        self.order.items.add(self.item)

    def test_get_order_detail(self):
        url = reverse('mypage:order_history', kwargs={'user_id': 5})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
