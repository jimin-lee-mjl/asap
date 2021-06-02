from rest_framework import serializers

from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from rest_auth.serializers import LoginSerializer
from rest_auth.registration.serializers import RegisterSerializer


# class UserLoginSerializer(LoginSerializer):
#     username = None


class UserRegisterSerializer(RegisterSerializer):
    username = None
    address = serializers.CharField(
        required=False,
        max_length=200,
    )


class UserSerializer(serializers.HyperlinkedModelSerializer):
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
