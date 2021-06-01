from enum import Enum
from rest_framework import status


class SuccessResponse(Enum):
    account_deleted = (
        'Account was successfully deleted',
        status.HTTP_200_OK
    )

    def __init__(self, SUCCESS_MSG, STATUS_CODE):
        self.SUCCESS_MSG = SUCCESS_MSG
        self.STATUS_CODE = STATUS_CODE
