from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import Item, Keyword
from .serializers import ItemListSerializer, ItemDetailSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def list_items_by_category(request):
    '''
    사용자가 선택한 카테고리에 해당하는 아이템 목록을 보내주는 API

    ---
    ## `/api/item/recommendation?keywords=&categories=`
       - 복수의 쿼리 구분 시 쉼표(',')로 해주세요.
    ## 응답 내용
       - category1 : 카테고리에 해당하는 아이템의 asin, title, price 정보
       - category2 : 카테고리에 해당하는 아이템의 asin, title, price 정보
    '''
    if not 'keywords' in request.GET or not 'categories' in request.GET:
        error_msg = 'Keyword or Category does not exist.'
        return Response({'error_msg': error_msg}, status=status.HTTP_400_BAD_REQUEST)

    # 키워드 필터링 
    # items = []
    kws = []
    keywords = request.GET['keywords'].split(',')
    for kw in keywords:
        keyword = Keyword.objects.get(name=kw)
        kws.append(keyword)

    # for kw in keywords:
    #     keyword = Keyword.objects.get(name=kw)
    #     items = Item.objects.filter(keywords__contains=keyword)
    #     for it in items:
    #         if it not in items:
    #             items.append(it)
    items = Item.objects.filter(keywords__in=kws)

    # 카테고리 필터링 
    item_dict = dict()
    categories = request.GET['categories'].split(',')
    for cg in categories:
        item_dict[cg] = []
        for it in items:
            if it.category == cg and len(item_dict[cg]) < 9:
                serializer = ItemListSerializer(it)
                item_dict[cg].append(serializer.data)

        # items = Item.objects.filter(category__exact=cg)[:8]
        # serializer = ItemListSerializer(items, many=True)
        # item_dict[cg] = serializer.data

    return Response(item_dict, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([AllowAny])
def show_item_details(request, item_id):
    '''
    해당 아이템의 상세 정보를 반환하는 API

    ---
    ## `/api/item/<str:item_id>`
    ## 요청 패러미터
       - item_id : 요청할 아이템의 asin 넘버
    ## 응답 내용
       - title : 상품명
       - price : 상품 가격
       - category : 상품 카테고리 
       - keywords : 상품 키워드 
       - is_women : 여성용 아이템인지의 여부 
    '''
    item = get_object_or_404(Item, pk=item_id)
    serializer = ItemDetailSerializer(item)
    return Response(serializer.data, status=status.HTTP_200_OK)


# @api_view(['GET'])
# @permission_classes([AllowAny])
# def list_items_by_category(request):
#     if not 'keywords' in request.GET:
#         error_msg = 'Keyword does not exist.'
#         return Response({'error_msg': error_msg}, status=status.HTTP_400_BAD_REQUEST)

#     items = []
#     keywords = request.GET['keywords'].split(',')
#     for kw in keywords:
#         keyword = Keyword.objects.get(name=kw)
#         items = Item.objects.filter(keywords__contains=keyword)
#         for it in items:
#             if it not in items:
#                 items.append(it)

#     return items
