from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework.views import status
from .models import TestProduct, TestUser


class TestUserProfileAPIView(APITestCase):
    def setUp(self):
        self.url = reverse('api-profile')
        self.user = TestUser.objects.get(pk=1)

    def test_get_profile(self):
        data = {
            'user_id': self.user.pk
        }
        response = self.client.get(self.url, data=data, format='json')
        self.assertEquals(response.status_code, status.HTTP_200_OK)