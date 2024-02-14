from django.shortcuts import render, HttpResponse

# view to check if the server is running
def doctor(request):
    return HttpResponse('Japan Community Backend Server is running!')