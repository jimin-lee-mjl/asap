from django.urls import path
from . import views

app_name = 'accounts'

urlpatterns = [
    path('delete/', views.AccountDeleteView.as_view(), name='account_delete'),
]
