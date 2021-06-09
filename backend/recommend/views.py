from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import Item
from .serializers import ItemListSerializer, ItemDetailSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def list_items_by_category(request):
    '''
    사용자가 선택한 카테고리에 해당하는 아이템 목록을 보내주는 API

    ---
    ## `/api/recommendation?keywords=&categories=`
       - 복수의 쿼리 구분 시 쉼표(',')로 해주세요.
    ## 응답 내용
       - category1 : 카테고리에 해당하는 아이템의 asin, title, price 정보
       - category2 : 카테고리에 해당하는 아이템의 asin, title, price 정보
    '''
    if not 'categories' in request.GET:
        error_msg = 'Category does not exist.'
        return Response({'error_msg': error_msg}, status=status.HTTP_400_BAD_REQUEST)

    item_dict = dict()
    categories = request.GET['categories'].split(',')
    for cg in categories:
        items = Item.objects.filter(category__exact=cg)[:4]
        serializer = ItemListSerializer(items, many=True)
        item_dict[cg] = serializer.data

    return Response(item_dict, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def show_item_details(request, item_id):
    item = get_object_or_404(Item, pk=item_id)
    serializer = ItemDetailSerializer(item)
    return Response(serializer.data, status=status.HTTP_200_OK)
