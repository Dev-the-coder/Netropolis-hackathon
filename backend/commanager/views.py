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
        token = create_token(user.id, "commanager")
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
        token = create_token(user.id, "commanager")
        return JsonResponse({"message": "ComManager logged in successfully", "token": token}, status=200)
    except ComManager.DoesNotExist:
        return JsonResponse({"error": "ComManager does not exist"}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

@swagger_auto_schema(
    tags=['ComManager'],
    method='get',
    manual_parameters=[openapi.Parameter('Authorization', in_=openapi.IN_HEADER, type=openapi.TYPE_STRING, required=True)],
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
            user = ComManager.objects.get(id=payload['id'])
            return JsonResponse({"name": user.name, "dob": user.dob, "location": user.location, "area": user.area, "email": user.email}, status=200)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
    else:
        return JsonResponse({"error": "Token not provided"}, status=400)
    
@swagger_auto_schema(
    tags=['ComManager'],
    method='get',
    manual_parameters=[openapi.Parameter('Authorization', in_=openapi.IN_HEADER, type=openapi.TYPE_STRING, required=True)],
    responses={
        200: openapi.Response('OK'),
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
        user = ComManager.objects.get(id=payload['id'])
        quests = Quest.objects.filter(comManagerId=user.id)
        return JsonResponse({"quests": list(quests.values())}, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
@swagger_auto_schema(
    tags=['ComManager'],
    method='get',
    manual_parameters=[openapi.Parameter('Authorization', in_=openapi.IN_HEADER, type=openapi.TYPE_STRING, required=True)],
    responses={
        200: openapi.Response('OK'),
        400: 'Bad Request'
    }
)
@api_view(['GET'])
@csrf_exempt
@require_http_methods(['GET'])
def questRequests(request, id):
    token = request.headers.get('Authorization')
    if not token:
        return JsonResponse({"error": "Token not provided"}, status=400)
    try:
        payload = decode_token(token)
    except Exception as e:
        return JsonResponse({"error": "Invalid token, please sign in again"}, status=500)
    try:
        user = ComManager.objects.get(id=payload['id'])
        if not user:
            return JsonResponse({"error": "User profile not found"}, status=404)
        quest = QuestRegistration.objects.filter(quest_id=id)
        return JsonResponse({"requests": list(quest.values())}, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

@swagger_auto_schema(
    tags=['ComManager'],
    method='put',
    manual_parameters=[openapi.Parameter('Authorization', in_=openapi.IN_HEADER, type=openapi.TYPE_STRING, required=True)],
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'status': openapi.Schema(type=openapi.TYPE_STRING),
            'quest_id': openapi.Schema(type=openapi.TYPE_INTEGER),
            'user_id': openapi.Schema(type=openapi.TYPE_INTEGER)
        },
        required=['status', 'quest_id', 'user_id', 'Authorization']
    ),
    responses={
        200: openapi.Response('OK'),
        400: 'Bad Request'
    }
)
@api_view(['PUT'])
@csrf_exempt
@require_http_methods(['PUT'])
def questRequestAction(request):
    token = request.headers.get('Authorization')
    if not token:
        return JsonResponse({"error": "Token not provided"}, status=400)
    try:
        payload = decode_token(token)
    except Exception as e:
        return JsonResponse({"error": "Invalid token, please sign in again"}, status=500)
    try:
        user = ComManager.objects.get(id=payload['id'])
        if not user:
            return JsonResponse({"error": "User profile not found"}, status=404)
        quest = QuestRegistration.objects.filter(quest_id=request.data.get('quest_id'), user_id=request.data.get('user_id'))
        if not quest:
            return JsonResponse({"error": "Quest not found"}, status=404)
        # quest.status = request.data.get('status')
        # # "'QuerySet' object has no attribute 'save'"
        # # .save won't work as it is a QuerySet object
        # # We need to use .update() instead
        quest.update(status=request.data.get('status'))
        return JsonResponse({"message": "Quest request updated successfully"}, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)