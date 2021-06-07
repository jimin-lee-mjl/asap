from django.urls import path
from .views import user_views
from .views import order_views
from .views import item_views

app_name = 'mypage'

urlpatterns = [
    path('user/', user_views.ShowUserDetailsView.as_view(), name='detail'),
    path('user/delivery/', user_views.SaveDeliveryInfoView.as_view(), name='delivery'),
    path('user/like/', item_views.LikeItemDetailsView.as_view(), name='like'),
    path('user/cart/', item_views.CartItemDetailsView.as_view(), name='cart'),
    path('order/', order_views.create_new_order, name='new_order'),
    path('order/<int:order_id>/', order_views.show_order_details, name='order_detail'),
]
