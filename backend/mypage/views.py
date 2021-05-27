from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from .models import TestProduct, TestUser
from .serializers import ItemSerializer, UserSerializer


class ProfileView(APIView):
    '''
    사용자 프로필을 조회하고 업데이트하는 API

    ---
    ## `/api/mypage/<int:user_id>/profile`
    ## 내용
       - name : 유저 닉네임
       - wish : 찜 목록
       - bag : 장바구니 목록
       - buy : 구매 내역 
    '''
    profile_response = {
        '204': openapi.Response(
            description='사용자 프로필 정보를 업데이트하는 API',
            examples={
                'application/json': {
                    'name': '앨리스',
                    'wish': ['item1', 'item2'],
                    'bag': ['item3', 'item4'],
                    'buy': ['item5', 'item6']
                }
            }
        )
    }

    @swagger_auto_schema(responses=profile_response)
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
    '''
    사용자의 찜 목록에서 아이템을 삭제하는 API

    ---
    ## `api/mypage/<int:user_id>/wishlist/`
    ## 내용
       - name : 아이템 이름
    '''

    def delete(self, request, user_id, format=None):
        serializer = ItemSerializer(data=request.data)

        if serializer.is_valid():
            user = get_object_or_404(TestUser, pk=user_id)
            # name -> asin으로 변경 필요
            item = TestProduct.objects.filter(
                name__exact=serializer.validated_data['name']).get()
            user.wish.remove(item)
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BagView(APIView):
    '''
    사용자의 장바구니 목록에서 아이템을 삭제하는 API

    ---
    ## `api/mypage/<int:user_id>/bag/`
    ## 내용
       - name : 아이템 이름
    '''

    def delete(self, request, user_id, format=None):
        serializer = ItemSerializer(data=request.data)

        if serializer.is_valid():
            user = get_object_or_404(TestUser, pk=user_id)
            # name -> asin으로 변경 필요
            item = TestProduct.objects.filter(
                name__exact=serializer.validated_data['name']).get()
            user.bag.remove(item)
            return Response(status=status.HTTP_204_NO_CONTENT)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
