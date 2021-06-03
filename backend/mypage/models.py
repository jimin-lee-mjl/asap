from django.db import models
from recommend.models import Item, Keyword
from accounts.models import User


class OrderDetail(models.Model):
    user_id = models.ForeignKey(
        User, related_name='order_history', on_delete=models.CASCADE)
    items = models.ManyToManyField(Item, related_name='orders')
    ordered_at = models.DateTimeField(auto_now_add=True)
    total_price = models.FloatField()

    def __str__(self):
        return '%s, %.2f' % (self.ordered_at, self.total_price)
