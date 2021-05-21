from django.shortcuts import get_object_or_404
from rest_framework.serializers import Serializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TestUser
from .serializers import UserSerializer


class ProfileView(APIView):
    def get(self, request, user_id, format=None):
        # print(TestUser.objects.get(name='marina').pk)
        user = get_object_or_404(TestUser, pk=user_id)
        serializer = UserSerializer({
            'name': user.name
        })
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, user_id, format=None):
        serializer = UserSerializer(data=request.data)

        if serializer.is_valid():
            user_name = serializer.validated_data['name']
            # print('marina2', TestUser.objects.get(name='marina').pk)
            user = get_object_or_404(TestUser, pk=user_id)
            user.name = user_name
            user.save()
            # print(TestUser.objects.get(pk=3).name)
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HistoryView(APIView):
    def get(self, request, user_id, format=None):
        user = get_object_or_404(TestUser, pk=user_id)
        serializer = UserSerializer({
            'history': user.history
        })
        return Response(serializer.data, status=status.HTTP_200_OK)


class WishView(APIView):
    def get(self, request, user_id, format=None):
        user = get_object_or_404(TestUser, pk=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
