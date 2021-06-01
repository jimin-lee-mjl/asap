from enum import Enum
from rest_framework import status


class SuccessResponse(Enum):
    detail_listed = (
        'Details successfully listed.',
        status.HTTP_200_OK
    )
    delivery_info_updated = (
        'Delivery Information successfully updated.',
        status.HTTP_204_NO_CONTENT
    )
    item_added = (
        'Item successfully added.',
        status.HTTP_201_CREATED,
    )
    item_removed = (
        'Item successfully removed',
        status.HTTP_204_NO_CONTENT
    )

    def __init__(self, SUCCESS_MSG, STATUS_CODE):
        self.SUCCESS_MSG = SUCCESS_MSG
        self.STATUS_CODE = STATUS_CODE


class ErrorResponse(Enum):
    item_exists = (
        'The item already exists.',
        status.HTTP_409_CONFLICT
    )
    data_not_valid = (
        'Invalid data. Please check the response for error details.',
        status.HTTP_400_BAD_REQUEST
    )
    unauthorized = (
        'Unauthorized User. Please send request with proper token.',
        status.HTTP_401_UNAUTHORIZED
    )
    no_match = (
        'Matching user or item does not exist.',
        status.HTTP_404_NOT_FOUND
    )

    def __init__(self, ERROR_MSG, STATUS_CODE):
        self.ERROR_MSG = ERROR_MSG
        self.STATUS_CODE = STATUS_CODE


class ErrorResponseExample(Enum):
    item_exists = ({'error_detail': 'Item already exists.'})
    data_not_valid = ({
        'detail': 'JSON parse error - Expecting property name enclosed in double quotes'
    })
    unauthorized = ({
        'detail': 'Authentication credentials were not provided.'
    })
    no_match = ({'detail': 'Not found.'})

    def __init__(self, EXAMPLE):
        self.EXAMPLE = EXAMPLE


class SuccessResponseExample(Enum):
    list_user_detail = (
        {
            'email': 'elice123@elice.io',
            'password': 'somepassword123',
            'address': 'Seongdong-gu, Seoul, Korea',
            'postal_code': '04722',
            'keywords': ['homewear', 'sporty', 'cozy'],
            'like_items': ['1940280001', '8279996567'],
            'cart_items': ['B00005OTJ8', 'B000072X6P'],
            'order_history': [
                'order_id, order_datetime, total_price',
                '1, 2021-05-31 10:15:48.321923+00:00, 30.00',
                '2, 2021-05-31 10:21:17.013279+00:00, 20.00'
            ]
        }
    )
    update_delivery_info = (
        {
            'first_name': 'Julie',
            'last_name': 'Morgan',
            'address': 'Seongdong-gu, Seoul, Korea',
            'postal_code': '04256'
        }
    )
    list_like = (
        {
            'like_items': [
                {
                    "asin": "100045442",
                    "title": "blue hoody",
                    "price": 20.0
                },
                {
                    "asin": "40599922",
                    "title": "gray jogger",
                    "price": 30.0
                }
            ]
        }
    )
    update_like = (
        {
            'like_items': ['1940280001', '8279996567']
        }
    )
    list_cart = (
        {
            'cart_items': [
                {
                    "asin": "100045442",
                    "title": "blue hoody",
                    "price": 20.0
                },
                {
                    "asin": "40599922",
                    "title": "gray jogger",
                    "price": 30.0
                }
            ]
        }
    )
    update_cart = (
        {
            'cart_items': ['1940280001', '8279996567']
        }
    )
    list_order_detail = (
        {
            "order_detail": {
                "id": 3,
                "ordered_at": "2021-05-31T10:15:48.321923Z",
                "total_price": 50.0,
                "user_id": 2,
                "items": [
                    "40599922",
                    "B0023446"
                ],
                "first_name": "Jimin",
                "last_name": "Lee",
                "address": "Tamatea, Napier",
                "email": "jimin@elicce.io",
                "postal_code": "04577"
            },
            "item_info": [
                {
                    "asin": "B0023446",
                    "title": "blue hoody",
                    "price": 20.0
                },
                {
                    "asin": "40599922",
                    "title": "gray jogger",
                    "price": 30.0
                }
            ]
        }
    )
    post_new_order = (
        {
            "new_order": {
                "id": 7,
                "ordered_at": "2021-06-01T09:43:52.203983Z",
                "total_price": 80.0,
                "first_name": "Lilly",
                "last_name": "Jordan",
                "email": "lill@gmail.com",
                "address": "Napier, NZ",
                "postal_code": "1123",
                "user_id": 2,
                "items": [
                    "100045442",
                    "40599922"
                ]
            },
            "delivery_info": {
                "first_name": "Lilly",
                "last_name": "Jordan",
                "address": "Napier, NZ",
                "postal_code": "1123"
            }
        }
    )

    def __init__(self, EXAMPLE):
        self.EXAMPLE = EXAMPLE
