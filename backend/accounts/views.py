from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from django.contrib.auth import logout


class UserDeleteView(APIView):
    permission_classes = [IsAuthenticated]
    
    def delete(self, request, format=None):
        user = request.user
        user.delete()
        logout(request)
        content = {
            'status': 'request was permitted'
        }
        return Response(content)
