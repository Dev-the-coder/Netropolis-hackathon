from django.urls import path, include
from commanager import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('getuser/', views.getuser, name='getuser'),
    path('myquests/', views.myQuests, name='myquests'),
    path('quest/<int:id>/', views.questRequests, name='quest'),
    path('questaction/', views.questRequestAction, name='questaction'),
]