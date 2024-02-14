from commanager.models import ComManager
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError
from backend_netropolis.utils import create_token, decode_token
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

@swagger_auto_schema(
    tags=['ComManager'],
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'name': openapi.Schema(type=openapi.TYPE_STRING),
            'dob': openapi.Schema(type=openapi.TYPE_STRING),
            'location': openapi.Schema(type=openapi.TYPE_STRING),
            'area': openapi.Schema(type=openapi.TYPE_STRING),
            'email': openapi.Schema(type=openapi.TYPE_STRING),
            'password': openapi.Schema(type=openapi.TYPE_STRING)
        },
        required=['name', 'dob', 'location', 'area', 'email', 'password']
    ),
    responses={
        201: openapi.Response('Created'),
        400: 'Bad Request'
    }
)
@api_view(['POST'])
@csrf_exempt
@require_http_methods(['POST'])
def register(request):
    user_details = request.data
    try:
        user = ComManager(**user_details)
        user.full_clean()
        user.save()
        token = create_token(user.email, "commanager")
        return JsonResponse({"message": "ComManager registered successfully", "token": token}, status=201)
    except ValidationError as e:
        return JsonResponse({"errors": e.message_dict}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
@swagger_auto_schema(
    tags=['ComManager'],
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'email': openapi.Schema(type=openapi.TYPE_STRING),
            'password': openapi.Schema(type=openapi.TYPE_STRING)
        },
        required=['email', 'password']
    ),
    responses={
        200: openapi.Response('OK'),
        400: 'Bad Request'
    }
)
@api_view(['POST'])
@csrf_exempt
@require_http_methods(['POST'])
def login(request):
    user_details = request.data
    try:
        user = ComManager.objects.get(email=user_details['email'], password=user_details['password'])
        token = create_token(user.email, "commanager")
        return JsonResponse({"message": "ComManager logged in successfully", "token": token}, status=200)
    except ComManager.DoesNotExist:
        return JsonResponse({"error": "ComManager does not exist"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

@swagger_auto_schema(
    tags=['ComManager'],
    method='get',
    manual_parameters=[openapi.Parameter('Authorization', in_=openapi.IN_HEADER, type=openapi.TYPE_STRING)],
    responses={
        200: openapi.Response('OK'),
        400: 'Bad Request'
    }
)
@api_view(['GET'])
@csrf_exempt
@require_http_methods(['GET'])
def getuser(request):
    token = request.headers.get('Authorization')
    if token:
        try:
            payload = decode_token(token)
            user = ComManager.objects.get(email=payload['email'])
            return JsonResponse({"name": user.name, "dob": user.dob, "location": user.location, "area": user.area, "email": user.email}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Token not provided"}, status=400)