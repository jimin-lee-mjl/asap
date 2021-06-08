from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from recommend.models import Item
from ..models import OrderDetail
from ..serializers import (
    ItemSerializer, OrderDetailSerializer,
    NewOrderSerializer, DeliveryInfoSerializer
)
from ..swagger.responses import ErrorResponse, SuccessResponse
from ..swagger.swagger import Swagger
from ..swagger.req_params import RequestBody


@swagger_auto_schema(method='get', responses=Swagger.list_order_detail_response.RESPONSE)
@api_view(['GET'])
def show_order_details(request, order_id):
    '''
    사용자의 구매 내역 상세 정보를 조회하고 구매 내역을 추가하는 API

    ---
    ## `/api/order/<int:order_id>/`
    ## 요청 패러미터 
       - order_id : 구매 내역의 id값
    ## 요청 형식
       - 'application/json'
    ## 응답 내용
       - order_detail : 구매 내역 상세 정보 
       - item_info : 구매 아이템 상세 정보
    '''
    data = {}
        
    order = get_object_or_404(OrderDetail, pk=order_id)
    serializer = OrderDetailSerializer(order)
    data['order_detail'] = serializer.data
    
    item_info = []
    items = order.items.all()
    for item in items:
        item_serializer = ItemSerializer(item)
        item_info.append(item_serializer.data)
    data['item_info'] = item_info

    return Response(data, status=SuccessResponse.detail_listed.STATUS_CODE)


@swagger_auto_schema(method='post',
                     responses=Swagger.post_new_order_response.RESPONSE,
                     request_body=RequestBody.post_new_order_request.PARAMS)
@api_view(['POST'])
def create_new_order(request):
    '''
    사용자의 구매 내역 상세 정보를 조회하고 구매 내역을 추가하는 API

    ---
    ## `/api/order/`
    ## 요청 패러미터
       - user_id : 사용자의 id값 
       - items : 아이템 목록 (['asin', 'asin'] 형태)
       - total_price : 주문 총 가격
       - first_name : 사용자 이름
       - last_name : 사용자 성  
       - email : 사용자 이메일
       - address : 사용자의 배송지 주소
       - postal_code : 배송지 우편번호 
       - is_saving_address : 배송지 주소를 저장할 지에 대한 True/False 값
    ## 요청 형식
       - 'application/json'
    ## 응답 내용
       - new_order : 새롭게 등록된 구매 내역
       - delivery_info : 사용자의 배송지 정보 
    '''
    serializer = NewOrderSerializer(data=request.data)

    if serializer.is_valid():
        user = request.user
        new_order = OrderDetail.objects.create(
            user_id=user,
            total_price=serializer.data['total_price'],
            first_name=serializer.validated_data['first_name'],
            last_name=serializer.validated_data['last_name'],
            email=serializer.validated_data['email'],
            address=serializer.validated_data['address'],
            postal_code=serializer.validated_data['postal_code']
        )
        for asin in serializer.validated_data['items']:
            item = get_object_or_404(Item, pk=asin)
            new_order.items.add(item)
        new_order.save()

        if serializer.validated_data['is_saving_address'] == True:
            user.first_name = serializer.validated_data['first_name']
            user.last_name = serializer.validated_data['last_name']
            user.email = serializer.validated_data['email']
            user.address = serializer.validated_data['address']
            user.postal_code = serializer.validated_data['postal_code']
            user.save()

        new_order_response = OrderDetailSerializer(new_order)
        delivery_info_response = DeliveryInfoSerializer(user)
        data = {}
        data['new_order'] = new_order_response.data
        data['delivery_info'] = delivery_info_response.data
        return Response(data, status=SuccessResponse.item_added.STATUS_CODE)
    
    return Response(serializer.errors, status=ErrorResponse.data_not_valid.STATUS_CODE)