from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from paypalcheckoutsdk.orders import OrdersCreateRequest
from paypalcheckoutsdk.orders import OrdersCaptureRequest
from paypalcheckoutsdk.core import SandboxEnvironment, PayPalHttpClient
from .serializers import PriceSerializer


@api_view(['POST'])
def create_order(request):
    serializer = PriceSerializer(data=request.data)

    if serializer.is_valid():
        # setting up payment environment
        environment = SandboxEnvironment(
            client_id=settings.PAYPAL_CLIENT_ID,
            client_secret=settings.PAYPAL_SECRET_ID
        )
        client = PayPalHttpClient(environment)

        total_price = serializer.validated_data['total_price']

        order_request = OrdersCreateRequest()
        order_request.request_body (
            {
                "intent": "CAPTURE",
                "purchase_units": [
                    {
                        "amount": {
                            "currency_code": "USD",
                            "value": total_price
                        }
                    }
                ]
            }
        )

        response = client.execute(order_request)
        #response로부터 data dict 가져오기 
        data = response.result.__dict__['_dict']
        print(data)
        return Response({'order_id': response.result.id}, status=response.status_code)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def capture_order(request, order_id):
    environment = SandboxEnvironment(
        client_id=settings.PAYPAL_CLIENT_ID,
        client_secret=settings.PAYPAL_SECRET_ID
    )
    client = PayPalHttpClient(environment)
    order_request = OrdersCaptureRequest(order_id)

    response = client.execute(order_request)
    data = response.result.__dict__['_dict']
    print(data)
    return Response({'order_id': response.result.id}, status=response.status_code)