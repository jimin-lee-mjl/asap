from django.urls import path
from .views import user_views
from .views import order_views
from .views import item_views

app_name = 'mypage'

urlpatterns = [
    path('user/<int:user_id>/', user_views.UserDetailListView.as_view(), name='detail'),
    path('user/<int:user_id>/delivery/', user_views.DeliveryInfoSaveView.as_view(), name='delivery'),
    path('user/<int:user_id>/like/', item_views.LikeItemDetailView.as_view(), name='like'),
    path('user/<int:user_id>/cart/', item_views.CartItemDetailView.as_view(), name='cart'),
    path('order/detail/<int:order_id>/', order_views.ListOrderDetailView, name='order_detail'),
    path('order/<int:user_id>/', order_views.CreateNewOrderView, name='new_order')
]
