from enum import Enum
from drf_yasg import openapi


class RequestBody(Enum):
    update_delivery_info_request = (
        openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'first_name': openapi.Schema(type=openapi.TYPE_STRING, description='Julie'),
                'last_name': openapi.Schema(type=openapi.TYPE_STRING, description='Morgan'),
                'address': openapi.Schema(type=openapi.TYPE_STRING, description='Somewhere, Korea'),
                'postal_code': openapi.Schema(type=openapi.TYPE_STRING, description='04256'),
            }
        )
    )
    update_item_request = (
        openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'asin': openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Items(type=openapi.TYPE_STRING),
                    description=['0039487', 'B445922']
                )
            }
        )
    )
    post_new_order_request = (
        openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'items': openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Items(type=openapi.TYPE_STRING),
                    description=['0039487', 'B445922']
                ),
                'price': openapi.Schema(type=openapi.TYPE_NUMBER, description=50.00)
            }
        )
    )

    def __init__(self, PARAMS):
        self.PARAMS = PARAMS
