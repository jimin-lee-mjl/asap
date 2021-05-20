from django.db.models import fields
from rest_framework import serializers
from .models import TestUser


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestUser
        fields = '__all__'
