from django.db import models
from ..recommend.models import Item, Keyword
# from ..accounts.models import User


class User_t(models.Model):
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=50)
    address = models.CharField(max_length=100)
    keywords = models.ManyToManyField(Keyword, related_name='users')
    like_items = models.ManyToManyField(Item, related_name='likes_users')
    cart_items = models.ManyToManyField(Item, related_name='carted_users')


class OrderDetail(models.Model):
    # user_id = models.ForeignKey(User, related_name='order_history', on_delete=models.CASCADE)
    fake_user_id = models.ForeignKey(User_t, related_name='order_history', on_delete=models.CASCADE)
    items = models.ManyToManyField(Item, related_name='orders')
    ordered_at = models.DateTimeField(auto_now_add=True)
    total_price = models.FloatField()

    def __str__(self):
        return {
            '구매한 날짜': self.ordered_at,
            '총 금액': self.total_price
        }
