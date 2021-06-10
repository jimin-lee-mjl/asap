from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework.views import status
from mypage.factory import ItemFactory, KeywordFactory
from .custom_faker import fake


class TestRecommendItemView(APITestCase):
    def setUp(self):
        self.item = ItemFactory.create()
        self.item2 = ItemFactory.create()
        self.item3 = ItemFactory.create()
        self.item4 = ItemFactory.create()
        self.item5 = ItemFactory.create()
        self.keyword = KeywordFactory.create()
        self.keyword2 = KeywordFactory.create()
        self.item.keywords.add(self.keyword)
        self.item2.keywords.add(self.keyword)
        self.item3.keywords.add(self.keyword2)
        self.item4.keywords.add(self.keyword2)

    def test_get_items_by_category(self):
        categories = f'{fake.classify()},{fake.classify()}'
        keywords = f'{self.keyword.name},{self.keyword2.name}'
        url = f"{reverse('recommend:recommend_items')}?keywords={keywords}&categories={categories}"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestItemDetailsView(APITestCase):
    def setUp(self):
        self.item = ItemFactory.create()
    
    def test_get_item_details(self):
        url = reverse('recommend:item_detail', kwargs={'item_id':self.item.asin})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
