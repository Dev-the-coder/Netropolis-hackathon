from users.models import User
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
    tags=['User'],
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'name': openapi.Schema(type=openapi.TYPE_STRING),
            'dob': openapi.Schema(type=openapi.TYPE_STRING),
            'persona': openapi.Schema(type=openapi.TYPE_STRING),
            'location': openapi.Schema(type=openapi.TYPE_STRING),
            'field_of_specialization': openapi.Schema(type=openapi.TYPE_STRING),
            'email': openapi.Schema(type=openapi.TYPE_STRING),
            'password': openapi.Schema(type=openapi.TYPE_STRING),
            'completed_quest_tags': openapi.Schema(type=openapi.TYPE_STRING),
            'active_quest': openapi.Schema(type=openapi.TYPE_BOOLEAN),
            'points': openapi.Schema(type=openapi.TYPE_INTEGER)
        },
        required=['name', 'dob', 'persona', 'location','field_of_specialization' ,'email', 'password']
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
        user = User(**user_details)
        user.full_clean()
        user.save()
        token = create_token(user.email, "user")
        return JsonResponse({"message": "User registered successfully", "token": token}, status=201)
    except ValidationError as e:
        return JsonResponse({"errors": e.message_dict}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

@swagger_auto_schema(
    tags=['User'],
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'email': openapi.Schema(type=openapi.TYPE_STRING),
            'password': openapi.Schema(type=openapi.TYPE_STRING),
        },
        required=['email', 'password']
        ),
    responses={
        201: openapi.Response('Created'),
        400: 'Bad Request'
    }
)
@api_view(['POST'])
@csrf_exempt
@require_http_methods(['POST'])
def login(request):
    try:
        user_details = request.data
    except json.JSONDecodeError as e:
        return JsonResponse({"error": f"Invalid JSON {e}"}, status=400)
    try:
        user = User.objects.get(email=user_details.get('email'))
        if user.password == user_details.get('password'):
            token = create_token(user.email, "user")
            return JsonResponse({"message": "Login successful", "token": token}, status=200)
        else:
            return JsonResponse({"error": "Invalid password"}, status=400)
    except User.DoesNotExist:
        return JsonResponse({"error": "User does not exist"}, status=404)

@swagger_auto_schema(
    tags=['User'],
    method='get',
    manual_parameters=[openapi.Parameter('Authorization', in_=openapi.IN_HEADER, type=openapi.TYPE_STRING)],
    responses={
        201: openapi.Response('Created'),
        400: 'Bad Request'
    }
)
@api_view(['GET'])
@csrf_exempt
@require_http_methods(['GET'])
def get_user(request):
    token = request.headers.get('Authorization')
    if not token:
        return JsonResponse({"error": "Token is required"}, status=400)
    try:
        payload = decode_token(token)
        user = User.objects.get(email=payload.get('email'))
        return JsonResponse({
            "name": user.name,
            "dob": user.dob,
            "persona": user.persona,
            "location": user.location,
            "points": user.points,
            "field_of_specialization": user.field_of_specialization,
            "completed_quest_tags": user.completed_quest_tags,
            "active_quest": user.active_quest,
            "email": user.email,
        }, status=200)
    except User.DoesNotExist:
        return JsonResponse({"error": "User does not exist"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)