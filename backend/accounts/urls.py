from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('', views.AccountDeleteView.as_view(), name='account_delete'),
]
