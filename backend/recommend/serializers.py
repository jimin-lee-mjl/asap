from rest_framework import serializers
from .models import Item


class ItemListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['asin', 'title', 'price']


class ItemDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'
