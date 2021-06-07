from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from recommend.models import Item
from ..serializers import ItemSerializer
from ..swagger.responses import ErrorResponse, SuccessResponse
from ..swagger.swagger import Swagger
from ..swagger.req_params import RequestBody


class LikeItemDetailsView(APIView):
    '''
    사용자의 찜 목록 아이템의 상세정보를 조회하고 찜 목록에 아이템을 추가하거나 삭제하는 API

    ---
    ## `api/user/like/`
    ## 요청 패러미터
       - user_id : 사용자의 id값
       - asin : 요청할 아이템의 asin 넘버
    ## 요청 형식
       - 'application/json'
    ## 응답 내용
       - like_items : 사용자의 찜 목록  
    '''
    @swagger_auto_schema(responses=Swagger.list_like_item_detail_response.RESPONSE)
    def get(self, request, format=None):
        items = request.user.like_items.all()
        data = []
        for item in items:
            Serializer = ItemSerializer(item)
            data.append(Serializer.data)
        return Response({'like_items': data}, status=SuccessResponse.detail_listed.STATUS_CODE)

    @swagger_auto_schema(responses=Swagger.add_like_item_response.RESPONSE,
                         request_body=RequestBody.update_item_request.PARAMS)
    def post(self, request, format=None):
        serializer = ItemSerializer(data=request.data, partial=True)

        if serializer.is_valid():
            user = request.user
            item = get_object_or_404(
                Item, pk=serializer.validated_data['asin'])
            if item not in user.like_items.all():
                user.like_items.add(item)
                return Response({'like_items': user.get_like_items()}, status=SuccessResponse.item_added.STATUS_CODE)

            error_msg = ErrorResponse.item_exists.ERROR_MSG
            return Response(error_msg, status=ErrorResponse.item_exists.STATUS_CODE)
        return Response(serializer.errors, status=ErrorResponse.data_not_valid.STATUS_CODE)

    @swagger_auto_schema(responses=Swagger.del_like_item_response.RESPONSE,
                         request_body=RequestBody.update_item_request.PARAMS)
    def delete(self, request, format=None):
        serializer = ItemSerializer(data=request.data, partial=True)

        if serializer.is_valid():
            user = request.user
            item = get_object_or_404(
                Item, pk=serializer.validated_data['asin'])
            user.like_items.remove(item)
            return Response({'like_items': user.get_like_items()}, status=SuccessResponse.item_removed.STATUS_CODE)

        return Response(serializer.errors, status=ErrorResponse.data_not_valid.STATUS_CODE)


class CartItemDetailsView(APIView):
    '''
    사용자의 장바구니 아이템의 상세 정보를 조회하고 장바구니에 아이템을 추가하거나 삭제하는 API

    ---
    ## `api/user/cart/`
    ## 요청 패러미터
       - user_id : 사용자의 id값
       - asin : 요청할 아이템의 asin 넘버
    ## 요청 형식
       - 'application/json'
    ## 응답 내용
       - cart_items : 사용자의 장바구니 목록 
    '''
    @swagger_auto_schema(responses=Swagger.list_cart_item_detail_response.RESPONSE)
    def get(self, request, format=None):
        items = request.user.cart_items.all()
        data = []
        for item in items:
            Serializer = ItemSerializer(item)
            data.append(Serializer.data)
        return Response({'cart_items': data}, status=SuccessResponse.detail_listed.STATUS_CODE)

    @swagger_auto_schema(responses=Swagger.add_cart_item_response.RESPONSE,
                         request_body=RequestBody.update_item_request.PARAMS)
    def post(self, request, format=None):
        serializer = ItemSerializer(data=request.data, partial=True)

        if serializer.is_valid():
            user = request.user
            item = get_object_or_404(
                Item, pk=serializer.validated_data['asin'])
            if item not in user.cart_items.all():
                user.cart_items.add(item)
                return Response({'cart_items': user.get_cart_items()}, status=SuccessResponse.item_added.STATUS_CODE)

            error_msg = ErrorResponse.item_exists.ERROR_MSG
            return Response(error_msg, status=ErrorResponse.item_exists.STATUS_CODE)
        return Response(serializer.errors, status=ErrorResponse.data_not_valid.STATUS_CODE)

    @swagger_auto_schema(responses=Swagger.del_cart_item_response.RESPONSE,
                         request_body=RequestBody.update_item_request.PARAMS)
    def delete(self, request, format=None):
        serializer = ItemSerializer(data=request.data, partial=True)

        if serializer.is_valid():
            user = request.user
            item = get_object_or_404(
                Item, pk=serializer.validated_data['asin'])
            user.cart_items.remove(item)
            return Response({'cart_items': user.get_cart_items()}, status=SuccessResponse.item_removed.STATUS_CODE)

        return Response(serializer.errors, status=ErrorResponse.data_not_valid.STATUS_CODE)
