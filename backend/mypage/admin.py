from django.contrib import admin
from .models import TestProduct, TestUser

admin.site.register(TestUser)
admin.site.register(TestProduct)
