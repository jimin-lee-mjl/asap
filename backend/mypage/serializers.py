from rest_framework import serializers
from .models import TestProduct, TestUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name',
                  'address', 'postal_code', 'keywords', 'like_items', 
                  'cart_items', 'order_history']


class DeliveryInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'address', 'postal_code']


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestProduct
        fields = '__all__'


class NewOrderSerializer(serializers.ModelSerializer):
    is_saving_address = serializers.BooleanField()

    class Meta:
        model = OrderDetail
        exclude = ['user_id', 'ordered_at']
