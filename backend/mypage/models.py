from django.db import models
from ..recommend.models import Item
from ..accounts.models import User


class OrderHistory(models.Model):
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    items = models.ManyToManyField(Item, related_name='order_items')
    ordered_at = models.DateTimeField(auto_now_add=True)
    total_price = models.FloatField()
