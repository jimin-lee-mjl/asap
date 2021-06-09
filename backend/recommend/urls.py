from django.urls import path
from . import views

app_name = 'recommend'

urlpatterns = [
    path('<str:item_id>/', views.show_item_details, name='item_detail'),
    path('recommendation', views.list_items_by_category, name='recommend_items'),
]
