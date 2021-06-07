from rest_framework import serializers


class PriceSerializer(serializers.Serializer):
    total_price = serializers.FloatField()
