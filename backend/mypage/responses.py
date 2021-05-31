from enum import Enum
from rest_framework import status


class SuccessResponse(Enum):
    detail_listed = (
        'User detail successfully listed.',
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
    list_detail = (
        {
            'email': 'elice123@elice.io',
            'password': 'somepassword123',
            'address' : 'Seongdong-gu, Seoul, Korea',
            'keywords' : ['homewear', 'sporty', 'cozy'],
            'like_items': ['1940280001', '8279996567'],
            'cart_items': ['B00005OTJ8', 'B000072X6P'],
            'order_history': [
                {
                    '구매한 날짜': '2021-05-21 13:30',
                    '총 금액': 50.00
                },
                {
                    '구매한 날짜': '2021-06-12 15:20',
                    '총 금액': 80.00
                }
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

    def __init__(self, EXAMPLE):
        self.EXAMPLE = EXAMPLE
