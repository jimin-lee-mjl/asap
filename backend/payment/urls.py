from django.urls import path
from .views import create_order, capture_order

app_name = 'payment'

urlpatterns = [
    path('', create_order, name='detail'),
    path('<int:order_id>/', capture_order, name='detail'),
]
