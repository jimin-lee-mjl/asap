from rest_framework import serializers
from .models import TestProduct, TestUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestUser
        # fields = '__all__'
        fields = ['name']


class HistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = TestUser
        fields = ['buy']


class WishListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestUser
        fields = ['wish']


class BagSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestUser
        fields = ['bag']


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestProduct
        fields = '__all__'
