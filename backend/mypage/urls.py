from django.urls import path
from . import views

app_name = 'mypage'

urlpatterns = [
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('wishlist/', views.WishListView.as_view(), name='wishlist'),
    path('bag/', views.BagView.as_view(), name='bag'),
]
