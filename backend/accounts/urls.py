from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('delete/', views.UserDeleteView.as_view(), name='user_delete'),
]