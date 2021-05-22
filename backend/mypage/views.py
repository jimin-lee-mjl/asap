from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TestProduct, TestUser
from .serializers import ItemSerializer, UserSerializer


class ProfileView(APIView):
    def get(self, request, user_id, format=None):
        user = get_object_or_404(TestUser, pk=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def patch(self, request, user_id, format=None):
        serializer = UserSerializer(data=request.data, partial=True)

        if serializer.is_valid():
            user_name = serializer.validated_data['name']
            user = get_object_or_404(TestUser, pk=user_id)
            user.name = user_name
            user.save()
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WishListView(APIView):
    def delete(self, request, user_id, format=None):
        serializer = ItemSerializer(data=request.data)

        if serializer.is_valid():
            user = get_object_or_404(TestUser, pk=user_id)
            # name -> asin으로 변경 필요 
            item = TestProduct.objects.filter(name__exact=serializer.validated_data['name']).get()
            user.wish.remove(item)
            return Response(status=status.HTTP_204_NO_CONTENT)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BagView(APIView):
    def delete(self, request, user_id, format=None):
        serializer = ItemSerializer(data=request.data)

        if serializer.is_valid():
            user = get_object_or_404(TestUser, pk=user_id)
            # name -> asin으로 변경 필요 
            item = TestProduct.objects.filter(name__exact=serializer.validated_data['name']).get()
            user.bag.remove(item)
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
