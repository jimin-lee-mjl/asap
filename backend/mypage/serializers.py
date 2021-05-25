from rest_framework import serializers
from .models import TestProduct, TestUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestUser
        fields = '__all__'


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestProduct
        fields = '__all__'
