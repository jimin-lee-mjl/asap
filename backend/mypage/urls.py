from django.urls import path
from . import views

app_name = 'mypage'

urlpatterns = [
    path('user/<int:user_id>/', views.UserDetailListView.as_view(), name='detail'),
    path('user/<int:user_id>/delivery/', views.DeliveryInfoSaveView.as_view(), name='delivery'),
    path('user/<int:user_id>/like/', views.LikeItemDetailView.as_view(), name='like'),
    path('user/<int:user_id>/cart/', views.CartItemDetailView.as_view(), name='cart'),
    path('order/detail/<int:order_id>/', views.ListOrderDetailView, name='order_detail'),
    path('order/<int:user_id>/', views.CreateNewOrderView, name='new_order')
]
