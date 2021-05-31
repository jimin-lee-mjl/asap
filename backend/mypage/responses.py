from enum import Enum
from rest_framework import status


class SuccessResponse(Enum):
    detail_listed = (
        'Details successfully listed.',
        status.HTTP_200_OK
    )

    profile_updated = (
        'Profile successfully updated.',
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
        {'error_detail': 'Item already exists.'},
        status.HTTP_409_CONFLICT,
    )
    data_not_valid = (
        None,
        status.HTTP_400_BAD_REQUEST
    )

    def __init__(self, ERROR_MSG, STATUS_CODE):
        self.ERROR_MSG = ERROR_MSG
        self.STATUS_CODE = STATUS_CODE


class SuccessResponseExample(Enum):
    list_user_detail = (
        {
            'email': 'elice123@elice.io',
            'password': 'somepassword123',
            'address' : 'Seongdong-gu, Seoul, Korea',
            'keywords' : ['homewear', 'sporty', 'cozy'],
            'like_items': ['1940280001', '8279996567'],
            'cart_items': ['B00005OTJ8', 'B000072X6P'],
            'order_history': [
                '2021-05-31 10:15:48.321923+00:00, 30.00',
                '2021-05-31 10:21:17.013279+00:00, 20.00'
            ]
        }
    )

    update_profile = (
        {
            'email': 'elice123@elice.io',
            'password': 'somepassword123',
            'address': 'Seongdong-gu, Seoul, Korea'
        }
    )

    update_like = (
        {
            'like_items': ['1940280001', '8279996567']
        }
    )

    update_cart = (
        {
            'cart_items': ['1940280001', '8279996567']
        }
    )

    list_order_detail = (
        {
            "order_history_details": [
                {
                    "id": 3,
                    "ordered_at": "2021-05-31T10:15:48.321923Z",
                    "total_price": 50.0,
                    "user_id": 2,
                    "items": [
                        "40599922",
                        "B0023446"
                    ]
                },
                {
                    "id": 4,
                    "ordered_at": "2021-05-31T10:21:17.013279Z",
                    "total_price": 20.0,
                    "user_id": 2,
                    "items": [
                        "100045442"
                    ]
                }
            ]
        }
    )

    def __init__(self, EXAMPLE):
        self.EXAMPLE = EXAMPLE
