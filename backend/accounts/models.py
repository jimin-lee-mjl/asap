from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

# Create your models here.


class User(AbstractUser):
    address = models.CharField('Address', blank=True, max_length=200)
    # like_items = models.ManyToManyField('Item', blank=True)
    # cart_items = models.ManyToManyField('Item', blank=True)
    # keywords = models.ManyToManyField('Keyword', blank=True)
