from django.urls import path
from search import views

urlpatterns = [
    path('getTags/', views.getTags, name='getTags'),
    path('searchByTags/', views.searchByTags, name='searchByTags'),
    path('deepSearch/', views.deepSearch, name='deepSearch')
]