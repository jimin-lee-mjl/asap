from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager
from recommend.models import Keyword, Item


class User(AbstractUser):
    address = models.CharField('Address', blank=True, max_length=200)
    keywords = models.ManyToManyField(Keyword, related_name='users', blank=True)
    like_items = models.ManyToManyField(Item, related_name='like_users', blank=True)
    cart_items = models.ManyToManyField(Item, related_name='cart_users', blank=True)

    def get_keywords(self):
        return str([kw.name for kw in self.keywords.all()])

    def get_like_items(self):
        return str([item.asin for item in self.like_items.all()])

    def get_cart_items(self):
        return str([item.asin for item in self.cart_items.all()])

    def __str__(self):
        return str(self.pk)
