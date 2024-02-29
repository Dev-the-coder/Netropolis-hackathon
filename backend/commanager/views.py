from commanager.models import ComManager
from quest.models import Quest, QuestRegistration
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError
from backend_netropolis.utils import create_token, decode_token
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

@swagger_auto_schema(
    tags=['Community Manager'],
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'name': openapi.Schema(type=openapi.TYPE_STRING),
            'dob': openapi.Schema(type=openapi.TYPE_STRING),
            'gender': openapi.Schema(type=openapi.TYPE_STRING),
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
        token = create_token(user.id, "commanager")
        return JsonResponse({"message": "ComManager registered successfully", "token": token}, status=201)
    except ValidationError as e:
        return JsonResponse({"errors": e.message_dict}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
@swagger_auto_schema(
    tags=['Community Manager'],
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
        token = create_token(user.id, "commanager")
        return JsonResponse({"message": "ComManager logged in successfully", "token": token}, status=200)
    except ComManager.DoesNotExist:
        return JsonResponse({"error": "ComManager does not exist"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

@swagger_auto_schema(
    tags=['Community Manager'],
    method='get',
    manual_parameters=[openapi.Parameter('Authorization', in_=openapi.IN_HEADER, type=openapi.TYPE_STRING, required=True)],
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'name': openapi.Schema(type=openapi.TYPE_STRING),
                'dob': openapi.Schema(type=openapi.TYPE_STRING),
                'gender': openapi.Schema(type=openapi.TYPE_STRING),
                'location': openapi.Schema(type=openapi.TYPE_STRING),
                'area': openapi.Schema(type=openapi.TYPE_STRING),
                'email': openapi.Schema(type=openapi.TYPE_STRING)
            }),
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
            if payload['role'] != 'commanager':
                return JsonResponse({"error": "Invalid token"}, status=400)
            user = ComManager.objects.get(id=payload['id'])
            return JsonResponse({"name": user.name, "dob": user.dob, "gender": user.gender, "location": user.location, "area": user.area, "email": user.email}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Token not provided"}, status=400)
    
@swagger_auto_schema(
    tags=['Community Manager'],
    method='get',
    operation_description='Get all quests created by the ComManager. Requires a valid token of Community manager.',
    manual_parameters=[openapi.Parameter('Authorization', in_=openapi.IN_HEADER, type=openapi.TYPE_STRING, required=True)],
    responses={
        200: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'quests': openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(
                        type=openapi.TYPE_OBJECT,
                        properties={
                            'id': openapi.Schema(type=openapi.TYPE_INTEGER),
                            'active': openapi.Schema(type=openapi.TYPE_STRING),
                            'datetime': openapi.Schema(type=openapi.TYPE_STRING),
                            'location': openapi.Schema(type=openapi.TYPE_STRING),
                            'provided_by': openapi.Schema(type=openapi.TYPE_STRING),
                            'title': openapi.Schema(type=openapi.TYPE_STRING),
                            'duration': openapi.Schema(type=openapi.TYPE_STRING),
                            'description': openapi.Schema(type=openapi.TYPE_STRING),
                            'points': openapi.Schema(type=openapi.TYPE_INTEGER),
                            'fee': openapi.Schema(type=openapi.TYPE_INTEGER),
                            'allowance': openapi.Schema(type=openapi.TYPE_STRING),
                            'tags': openapi.Schema(type=openapi.TYPE_STRING),
                            'comManagerId': openapi.Schema(type=openapi.TYPE_INTEGER)
                        }))}),
        400: 'Bad Request'
    }
)
@api_view(['GET'])
@csrf_exempt
@require_http_methods(['GET'])
def myQuests(request):
    token = request.headers.get('Authorization')
    if not token:
        return JsonResponse({"error": "Token not provided"}, status=400)
    try:
        payload = decode_token(token)
        if payload['role'] != 'commanager':
            return JsonResponse({"error": "Invalid token"}, status=400)
        user = ComManager.objects.get(id=payload['id'])
        quests = Quest.objects.filter(comManagerId=user.id)
        return JsonResponse({"quests": list(quests.values())}, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)