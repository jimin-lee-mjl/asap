from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from recommend.models import Item
from accounts.models import User
from .models import OrderDetail
from .serializers import (
    ItemSerializer, UserSerializer, OrderDetailSerializer,
    NewOrderSerializer, DeliveryInfoSerializer
)
from .responses import ErrorResponse, SuccessResponse
from .swagger import Swagger
from .req_params import RequestBody


class UserDetailListView(APIView):
    '''
    사용자의 프로필, 키워드 및 찜 목록, 장바구니, 구매 내역 정보를 조회하는 API

    ---
    ## `/api/user/<int:user_id>/`
    ## 요청 패러미터
       - user_id : 사용자의 id값
    ## 요청 형식
       - 'application/json'
    ## 응답 내용
       - email : 사용자 이메일
       - password : 사용자 비밀번호
       - first_name : 사용자 이름
       - last_name : 사용자 이름
       - address : 사용자의 배송지 주소
       - postal_code : 사용자의 우편번호 
       - keywords : 사용자가 선택한 키워드 히스토리 
       - like_items : 사용자의 찜 목록
       - cart_items : 사용자의 장바구니 목록
       - order_history : 사용자의 구매 내역 (주문 일시, 총 금액)
    '''
    @swagger_auto_schema(responses=Swagger.list_user_detail_response.RESPONSE)
    def get(self, request, user_id, format=None):
        user = get_object_or_404(User, pk=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=SuccessResponse.detail_listed.STATUS_CODE)


class DeliveryInfoUpdateView(APIView):
    '''
    사용자 배송지 정보를 업데이트하는 API

    ---
    ## `/api/user/<int:user_id>/profile`
    ## 요청 패러미터
       - user_id : 사용자의 id값 (필수)
       - first_name : 사용자 이름 (선택)
       - last_name : 사용자 이름 (선택)
       - address : 사용자의 배송지 주소 (선택)
       - postal_code : 사용자 우편번호 (선택)
    ## 요청 형식
       - 'application/json'
    ## 응답 내용
       - first_name : 사용자 이름 
       - last_name : 사용자 이름 
       - address : 사용자의 배송지 주소
       - postal_code : 사용자 우편번호
    '''
    @swagger_auto_schema(responses=Swagger.create_delivery_info_response.RESPONSE,
                         request_body=RequestBody.update_delivery_info_request.PARAMS)
    def post(self, request, user_id, format=None):
        serializer = DeliveryInfoSerializer(data=request.data)

        if serializer.is_valid():
            user = get_object_or_404(User, pk=user_id)
            user.first_name = serializer.validated_data['first_name']
            user.last_name = serializer.validated_data['last_name']
            user.address = serializer.validated_data['address']
            user.postal_code = serializer.validated_data['postal_code']
            user.save()
            response_serial = DeliveryInfoSerializer(user)
            return Response(response_serial.data, status=SuccessResponse.delivery_info_created.STATUS_CODE)

        return Response(serializer.errors, status=ErrorResponse.data_not_valid.STATUS_CODE)

    @swagger_auto_schema(responses=Swagger.update_delivery_info_response.RESPONSE, 
                         request_body=RequestBody.update_delivery_info_request.PARAMS)
    def patch(self, request, user_id, format=None):
        serializer = DeliveryInfoSerializer(data=request.data, partial=True)

        if serializer.is_valid():
            user = get_object_or_404(User, pk=user_id)

            if 'first_name' in serializer.validated_data:
                user.first_name = serializer.validated_data['first_name']
            if 'last_name' in serializer.validated_data:
                user.last_name = serializer.validated_data['last_name']   
            if 'address' in serializer.validated_data:
                user.address = serializer.validated_data['address']
            if 'postal_code' in serializer.validated_data:
                user.postal_code = serializer.validated_data['postal_code']

            user.save()
            response_serial = DeliveryInfoSerializer(user)
            return Response(response_serial.data, status=SuccessResponse.delivery_info_updated.STATUS_CODE)

        return Response(serializer.errors, status=ErrorResponse.data_not_valid.STATUS_CODE)


class LikeItemDetailView(APIView):
    '''
    사용자의 찜 목록 아이템의 상세정보를 조회하고 찜 목록에 아이템을 추가하거나 삭제하는 API

    ---
    ## `api/user/<int:user_id>/like/`
    ## 요청 패러미터
       - user_id : 사용자의 id값
       - asin : 요청할 아이템의 asin 넘버
    ## 요청 형식
       - 'application/json'
    ## 응답 내용
       - like_items : 사용자의 찜 목록  
    '''
    @swagger_auto_schema(responses=Swagger.list_like_item_detail_response.RESPONSE)
    def get(self, request, user_id, format=None):
        user = get_object_or_404(User, pk=user_id)
        items = user.like_items.all()
        data = []
        for item in items:
            Serializer = ItemSerializer(item)
            data.append(Serializer.data)
        return Response({'like_items': data}, status=SuccessResponse.detail_listed.STATUS_CODE)

    @swagger_auto_schema(responses=Swagger.add_like_item_response.RESPONSE,
                         request_body=RequestBody.update_item_request.PARAMS)
    def post(self, request, user_id, format=None):
        serializer = ItemSerializer(data=request.data, partial=True)

        if serializer.is_valid():
            user = get_object_or_404(User, pk=user_id)
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
    def delete(self, request, user_id, format=None):
        serializer = ItemSerializer(data=request.data, partial=True)

        if serializer.is_valid():
            user = get_object_or_404(User, pk=user_id)
            item = get_object_or_404(
                Item, pk=serializer.validated_data['asin'])
            user.like_items.remove(item)
            return Response({'like_items': user.get_like_items()}, status=SuccessResponse.item_removed.STATUS_CODE)

        return Response(serializer.errors, status=ErrorResponse.data_not_valid.STATUS_CODE)


class CartItemDetailView(APIView):
    '''
    사용자의 장바구니 아이템의 상세 정보를 조회하고 장바구니에 아이템을 추가하거나 삭제하는 API

    ---
    ## `api/user/<int:user_id>/cart/`
    ## 요청 패러미터
       - user_id : 사용자의 id값
       - asin : 요청할 아이템의 asin 넘버
    ## 요청 형식
       - 'application/json'
    ## 응답 내용
       - cart_items : 사용자의 장바구니 목록 
    '''
    @swagger_auto_schema(responses=Swagger.list_cart_item_detail_response.RESPONSE)
    def get(self, request, user_id, format=None):
        user = get_object_or_404(User, pk=user_id)
        items = user.cart_items.all()
        data = []
        for item in items:
            Serializer = ItemSerializer(item)
            data.append(Serializer.data)
        return Response({'cart_items': data}, status=SuccessResponse.detail_listed.STATUS_CODE)

    @swagger_auto_schema(responses=Swagger.add_cart_item_response.RESPONSE,
                         request_body=RequestBody.update_item_request.PARAMS)
    def post(self, request, user_id, format=None):
        serializer = ItemSerializer(data=request.data, partial=True)

        if serializer.is_valid():
            user = get_object_or_404(User, pk=user_id)
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
    def delete(self, request, user_id, format=None):
        serializer = ItemSerializer(data=request.data, partial=True)

        if serializer.is_valid():
            user = get_object_or_404(User, pk=user_id)
            item = get_object_or_404(
                Item, pk=serializer.validated_data['asin'])
            user.cart_items.remove(item)
            return Response({'cart_items': user.get_cart_items()}, status=SuccessResponse.item_removed.STATUS_CODE)

        return Response(serializer.errors, status=ErrorResponse.data_not_valid.STATUS_CODE)


class OrderItemDetailView(APIView):
    '''
    사용자의 구매 내역 상세 정보를 조회하고 구매 내역을 추가하는 API

    ---
    ## `/api/user/<int:user_id>/order`
    ## 요청 패러미터
       - user_id : 사용자의 id값 
       - items : 아이템 목록 (['asin', 'asin'] 형태)
       - price : 주문 총 가격
    ## 요청 형식
       - 'application/json'
    ## 응답 내용
       ### GET
       - order_history_details : 구매 내역 상세 정보 
       ### POST
       - new_order_details : 새롭게 등록된 구매 내역
    '''
    @swagger_auto_schema(responses=Swagger.list_order_detail_response.RESPONSE)
    def get(self, request, user_id, format=None):
        user = get_object_or_404(User, pk=user_id)
        orders = user.order_history.all()
        data = []
        for order in orders:
            serializer = OrderDetailSerializer(order)
            data.append(serializer.data)
        return Response({'order_history_details': data}, status=SuccessResponse.detail_listed.STATUS_CODE)

    @swagger_auto_schema(responses=Swagger.post_new_order_response.RESPONSE,
                         request_body=RequestBody.post_new_order_request.PARAMS)
    def post(self, request, user_id, format=None):
        serializer = NewOrderSerializer(data=request.data)

        if serializer.is_valid():
            user = get_object_or_404(User, pk=user_id)
            new_order = OrderDetail.objects.create(
                user_id=user,
                total_price=serializer.validated_data['price']
            )
            for asin in serializer.validated_data['items']:
                item = get_object_or_404(Item, pk=asin)
                new_order.items.add(item)
            new_order.save()

        response_serial = OrderDetailSerializer(new_order)
        return Response(response_serial.data, status=SuccessResponse.item_added.STATUS_CODE)
