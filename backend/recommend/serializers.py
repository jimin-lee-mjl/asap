from rest_framework import serializers
from .models import Amazon


class AmazonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Amazon
        fields = ['asin']
