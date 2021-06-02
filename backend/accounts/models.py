from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from ..recommend.models import Keyword, Item


class User(AbstractUser):
    address = models.CharField('Address', blank=True, max_length=200)

    def get_keywords(self):
        return str([kw.name for kw in self.keywords.all()])

    def get_like_items(self):
        return str([item.asin for item in self.like_items.all()])

    def get_cart_items(self):
        return str([item.asin for item in self.cart_items.all()])

    def __str__(self):
        return str(self.pk)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
    postal_code = models.CharField('Postal Code', blank=True, max_length=50)
    keywords = models.ManyToManyField(Keyword, related_name='users', blank=True)
    like_items = models.ManyToManyField(Item, related_name='like_users', blank=True)
    cart_items = models.ManyToManyField(Item, related_name='cart_users', blank=True)
