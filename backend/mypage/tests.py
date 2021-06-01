from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework.views import status
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, NewOrderSerializer
from .factory import UserFactory, ItemFactory, OrderFactory


class TestUserDetailListView(APITestCase):
    def setUp(self):
        self.user = UserFactory.create()
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
        self.user = UserFactory.create()
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
        self.user = UserFactory.create()
        self.item = ItemFactory.create()
        self.item2 = ItemFactory.create(asin='BB0091')
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
        self.user = UserFactory.create()
        self.item = ItemFactory.create()
        self.item2 = ItemFactory.create(asin='BB0091')
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
        self.user = UserFactory.create()
        self.item = ItemFactory.create()
        self.order = OrderFactory.create(user_id=self.user)
        self.order.items.add(self.item)
        token = Token.objects.get(user__email='testuser@test.com')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    def test_get_order_detail(self):
        url = reverse('mypage:order_detail', kwargs={'order_id':1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    # def  test_post_new_order(self):
    #     url = reverse('mypage:new_order')
    #     new_order = OrderFactory.create(user_id=self.user)
    #     serializer = NewOrderSerializer(new_order)
    #     response = self.client.post(url, data=serializer.data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
