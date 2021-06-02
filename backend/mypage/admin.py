from django.contrib import admin
from accounts.models import User
from recommend.models import Item, Keyword
from .models import OrderDetail

admin.site.register(Item)
admin.site.register(Keyword)
admin.site.register(OrderDetail)
