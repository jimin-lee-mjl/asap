from django.urls import path
from . import views

app_name = 'recommend'

urlpatterns = [
    path('', views.list_items_by_category, name='recommend_items'),
]
