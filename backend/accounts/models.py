from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager

# Create your models here.
class User(AbstractUser):
    # username = None
    # first_name = None
    # last_name = None
    # email = models.EmailField('이메일', unique=True)
    # password = models.CharField('비밀번호', max_length=150)

    # # USERNAME_FIELD = 'email'
    # REQUIRED_FIELD = []

    # objects = UserManager()

    address = models.CharField('주소', blank=True, max_length=200)
    # pass
