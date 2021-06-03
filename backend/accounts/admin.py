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
                    "email",
                    "password",
                    "address",
                    "keywords",
                    "like_items",
                    "cart_items",
                )
            },
        ),
    )

    list_display = (
        "email",
        "address",
        "get_keywords",
        "get_like_items",
        "get_cart_items"
    )
