from rest_framework import serializers
from ..recommend.models import Item
# from ..accounts.models import User
from .models import OrderDetail, User_t


class UserSerializer(serializers.ModelSerializer):
    order_history = serializers.StringRelatedField(many=True)

    class Meta:
        model = User_t
        fields = ['email', 'password', 'address', 'keywords',
                  'like_items', 'cart_items', 'order_history']


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['asin']


class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = '__all__'
