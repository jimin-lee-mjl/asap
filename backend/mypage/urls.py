from django.urls import path
from . import views

app_name = 'mypage'

urlpatterns = [
    path('', views.UserDetailListView.as_view(), name='detail'),
    path('profile/', views.UserProfileUpdateView.as_view(), name='profile'),
    path('like/', views.LikeItemUpdateView.as_view(), name='like'),
    path('cart/', views.CartItemUpdateView.as_view(), name='cart'),
    # path('order/', views.OrderDetailListView.as_view(), name='order_history')
]
