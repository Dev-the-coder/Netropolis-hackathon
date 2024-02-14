from django.shortcuts import render, HttpResponse

# view to check if the server is running
def doctor(request):
    return HttpResponse('Netropolis Community Backend Server is running!')