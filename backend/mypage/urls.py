from django.urls import path
from .views import user_views
from .views import order_views
from .views import item_views

app_name = 'mypage'

urlpatterns = [
    path('user/', user_views.UserDetailListView.as_view(), name='detail'),
    path('user/delivery/', user_views.DeliveryInfoSaveView.as_view(), name='delivery'),
    path('user/like/', item_views.LikeItemDetailView.as_view(), name='like'),
    path('user/cart/', item_views.CartItemDetailView.as_view(), name='cart'),
    path('order/', order_views.CreateNewOrderView, name='new_order'),
    path('order/<int:order_id>/', order_views.ListOrderDetailView, name='order_detail'),
]
