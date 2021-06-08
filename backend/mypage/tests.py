import faker
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework.views import status
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer
from .factory import UserFactory, ItemFactory, OrderFactory


class TestUserDetailListView(APITestCase):
    def setUp(self):
        self.user = UserFactory.create()
        token = Token.objects.get(user__username=self.user.username)
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
        token = Token.objects.get(user__username=self.user.username)
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
        self.item2 = ItemFactory.create()
        self.item3 = ItemFactory.create()
        self.item4 = ItemFactory.create()
        self.user.like_items.add(self.item3)
        self.user.like_items.add(self.item4)
        token = Token.objects.get(user__username=self.user.username)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    def test_get_like_item(self):
        url = reverse('mypage:like')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_like_item(self):
        url = reverse('mypage:like')
        data = {
            'asin': [self.item.asin, self.item2.asin]
        }
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_del_like_item(self):
        url = reverse('mypage:like')
        data = {
            'data': {'asin': [self.item3.asin, self.item4.asin]}
        }
        response = self.client.delete(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class TestCartItemUpdateView(APITestCase):
    def setUp(self):
        self.user = UserFactory.create()
        self.item = ItemFactory.create()
        self.item2 = ItemFactory.create()
        self.item3 = ItemFactory.create()
        self.item4 = ItemFactory.create()
        self.user.like_items.add(self.item3)
        self.user.like_items.add(self.item4)
        token = Token.objects.get(user__username=self.user.username)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    def test_get_cart_item(self):
        url = reverse('mypage:cart')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_post_cart_item(self):
        url = reverse('mypage:cart')
        data = {
            'asin': [self.item.asin, self.item2.asin]
        }
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_del_cart_item(self):
        url = reverse('mypage:cart')
        data = {
            'data': {'asin': [self.item3.asin, self.item4.asin]}
        }
        response = self.client.delete(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


class TestOrderDetailListView(APITestCase):
    def setUp(self):
        self.user = UserFactory.create()
        self.item = ItemFactory.create()
        self.item2 = ItemFactory.create()
        self.order = OrderFactory.create(user_id=self.user)
        self.order.items.add(self.item)
        self.order.items.add(self.item2)
        token = Token.objects.get(user__username=self.user.username)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    def test_get_order_detail(self):
        url = reverse('mypage:order_detail', kwargs={'order_id':1})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def  test_post_new_order(self):
        url = reverse('mypage:new_order')
        fake = faker.Faker()
        data = {
            'items': [self.item.asin, self.item2.asin],
            'total_price': fake.pydecimal(positive=True),
            'first_name': fake.first_name(),
            'last_name': fake.last_name(),
            'email': fake.email(),
            'address': fake.address(),
            'postal_code': fake.zipcode(),
            'is_saving_address': fake.pybool()
        }
        response = self.client.post(url, data=data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
