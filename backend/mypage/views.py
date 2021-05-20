from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TestUser
from .serializers import UserSerializer


class ProfileView(APIView):
    def get(self, request, user_id, format=None):
        user = TestUser.objects.get(pk=user_id)
        serializer = UserSerializer({
            'name': user.name
        })
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, format=None):
        return None
