from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

@admin.register(User)
class CustomUserAdmin(admin.ModelAdmin):
    """ Custom User Admin """

    fieldsets = (
        (
            "Custom Profile",
            {
                "fields": (
                    "is_superuser",
                    'username',
                    "email",
                    "password",
                    "keywords",
                    "like_items",
                    "cart_items",
                )
            },
        ),
        (
            "Delivery Info",
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "address",
                    "postal_code",
                )
            },
        )
    )

    list_display = (
        "email",
        "address",
        "get_keywords",
        "get_like_items",
        "get_cart_items"
    )
