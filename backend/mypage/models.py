from django.db import models
from recommend.models import Item
from accounts.models import User


class OrderDetail(models.Model):
    user_id = models.ForeignKey(
        User, related_name='order_history', on_delete=models.CASCADE)
    items = models.ManyToManyField(Item, related_name='orders')
    ordered_at = models.DateTimeField(auto_now_add=True)
    total_price = models.FloatField()
    first_name = models.CharField(max_length=100, default='')
    last_name = models.CharField(max_length=100, default='')
    email = models.CharField(max_length=100, default='')
    address = models.CharField(max_length=200, default='')
    postal_code = models.CharField(max_length=50, default='')

    def __str__(self):
        return '%d, %s, %.2f' % (self.pk, self.ordered_at, self.total_price)
