from django.urls import path, include
from quest import views

urlpatterns = [
    path('create/', views.createQuest),
    path('all/', views.allQuest),
    path('register/', views.questRequest)
]