from rest_framework.views import APIView
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from ..serializers import UserSerializer, DeliveryInfoSerializer
from ..swagger.responses import ErrorResponse, SuccessResponse
from ..swagger.swagger import Swagger
from ..swagger.req_params import RequestBody


class UserDetailListView(APIView):
    '''
    사용자의 프로필, 키워드 및 찜 목록, 장바구니, 구매 내역 정보를 조회하는 API

    ---
    ## `/api/user/`
    ## 요청 형식
       - 'application/json'
    ## 응답 내용
       - username : 사용자 id 
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
    def get(self, request, format=None):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=SuccessResponse.detail_listed.STATUS_CODE)


class DeliveryInfoSaveView(APIView):
    '''
    사용자 배송지 정보를 추가하거나 업데이트하는 API

    ---
    ## `/api/user/delivery/`
    ## 요청 패러미터
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
    @swagger_auto_schema(responses=Swagger.update_delivery_info_response.RESPONSE, 
                         request_body=RequestBody.update_delivery_info_request.PARAMS)
    def patch(self, request, format=None):
        serializer = DeliveryInfoSerializer(data=request.data, partial=True)

        if serializer.is_valid():
            user = request.user

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
