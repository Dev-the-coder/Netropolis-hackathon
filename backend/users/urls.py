from users import views
from django.urls import path, include

urlpatterns = [
    path('register', views.register),
    path('login', views.login),
    path('getuser', views.get_user),
]