from django.urls import path, include
from commanager import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('getuser/', views.getuser, name='getuser')
]