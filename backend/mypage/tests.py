from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework.views import status
from rest_framework.authtoken.models import Token
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
        token = Token.objects.get(user__email='testuser@test.com')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    def test_get_detail(self):
        url = reverse('mypage:detail')
        serializer = UserSerializer(self.user)
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, serializer.data)


class TestDeliveryInfoSaveView(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            email='testuser@test.com',
            password='hello123',
            address='Tamatea, Napier, NZ',
            postal_code='04256'
        )
        token = Token.objects.get(user__email='testuser@test.com')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    def test_patch_delivery_info(self):
        url = reverse('mypage:delivery')
        data = {
            'postal_code': '04222'
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
        token = Token.objects.get(user__email='testuser@test.com')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    def test_post_like_item(self):
        url = reverse('mypage:like')
        data = {
            'asin': self.item2.asin
        }
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_del_like_item(self):
        url = reverse('mypage:like')
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
        token = Token.objects.get(user__email='testuser@test.com')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    def test_post_cart_item(self):
        url = reverse('mypage:cart')
        data = {
            'asin': self.item2.asin
        }
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_del_cart_item(self):
        url = reverse('mypage:cart')
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
        token = Token.objects.get(user__email='testuser@test.com')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    def test_get_order_detail(self):
        url = reverse('mypage:order_detail', kwargs={'order_id':1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
