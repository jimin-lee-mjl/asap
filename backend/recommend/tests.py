import faker
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework.views import status
from mypage.factory import ItemFactory
from .custom_faker import fake


class TestRecommendItemView(APITestCase):
    def setUp(self):
        self.item = ItemFactory.create()
        self.item2 = ItemFactory.create()
        self.item3 = ItemFactory.create()
        self.item4 = ItemFactory.create()
        self.item5 = ItemFactory.create()

    def test_get_items_by_category(self):
        categories = f'{fake.classify()},{fake.classify()}'
        url = f"{reverse('recommend:recommend_items')}?categories={categories}"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
