from rest_framework import serializers
from .models import TestUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestUser
        fields = ['name']
