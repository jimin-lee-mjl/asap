from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Amazon
from .serializers import AmazonSerializer

# Create your views here.
@api_view(['POST'])
def AmazonAPI(request, keyword):
    amazon = Amazon.objects.filter(keyword=keyword).all()
    serializer = AmazonSerializer(amazon, many=True)
    return Response(serializer.data)
# => id=1에 대해 리턴된 Response: {'id': 1, 'name': '태뽕', 'phone': '01012345678', 'addr': '주소주소'}
