from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import logout
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from .responses import SuccessResponse


class AccountDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    account_delete_response = {
        '200': openapi.Response(
            description=SuccessResponse.account_deleted.SUCCESS_MSG
        )
    }

    @swagger_auto_schema(responses=account_delete_response)
    def delete(self, request, format=None):
        user = request.user
        user.delete()
        logout(request)
        return Response(status=SuccessResponse.account_deleted.STATUS_CODE)
