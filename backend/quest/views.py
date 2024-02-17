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
from quest.models import Quest, QuestRegistration
from commanager.models import ComManager
from users.models import User

@swagger_auto_schema(
    tags=['Quest'],
    method='post',
    operation_description="Create a new quest. This endpoint is only accessible to community managers. They specify the details of the quest and it is created in the database.",
    manual_parameters=[openapi.Parameter('Authorization', in_=openapi.IN_HEADER, type=openapi.TYPE_STRING, required=True)],
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'active': openapi.Schema(type=openapi.TYPE_STRING),
            'datetime': openapi.Schema(type=openapi.TYPE_STRING),
            'location': openapi.Schema(type=openapi.TYPE_STRING),
            'provided_by': openapi.Schema(type=openapi.TYPE_STRING),
            'title': openapi.Schema(type=openapi.TYPE_STRING),
            'duration': openapi.Schema(type=openapi.TYPE_STRING),
            'description': openapi.Schema(type=openapi.TYPE_STRING),
            'points': openapi.Schema(type=openapi.TYPE_INTEGER),
            'fee': openapi.Schema(type=openapi.TYPE_INTEGER),
            'allowance': openapi.Schema(type=openapi.TYPE_INTEGER),
            'tags': openapi.Schema(type=openapi.TYPE_STRING)
        },
        required=['datetime', 'location', 'provided_by', 'title', 'duration', 'description', 'points', 'fee', 'allowance', 'tags']
    ),
    responses={
        201: openapi.Response('Created'),
        400: 'Bad Request'
    }
)
@api_view(['POST'])
@csrf_exempt
@require_http_methods(['POST'])
def createQuest(request):
    token = request.headers.get('Authorization')
    if not token:
        return JsonResponse({"error": "Token is required"}, status=400)
    try:
        payload = decode_token(token)
        user = ComManager.objects.get(id=payload['id'])
        if not user:
            return JsonResponse({"error": "Community manager profile not found"}, status=404)
        quest_details = request.data
        quest = Quest(**quest_details)
        quest.comManagerId = user.id
        quest.full_clean()
        quest.save()
        return JsonResponse({"message": "Quest created successfully"}, status=201)
    except ValidationError as e:
        return JsonResponse({"errors": e.message_dict}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)


@swagger_auto_schema(
    tags=['Quest'],
    method='get',
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
                            'allowance': openapi.Schema(type=openapi.TYPE_INTEGER),
                            'tags': openapi.Schema(type=openapi.TYPE_STRING),
                            'comManagerId': openapi.Schema(type=openapi.TYPE_INTEGER)
                        }
                    )
                )
            }
        ),
        400: 'Bad Request'
    }
)
@api_view(['GET'])
@csrf_exempt
@require_http_methods(['GET'])
def allQuest(request):
    quests = Quest.objects.all()
    return JsonResponse({"quests": list(quests.values())}, status=200)


@swagger_auto_schema(
    tags=['Quest'],
    method='post',
    manual_parameters=[openapi.Parameter('Authorization', in_=openapi.IN_HEADER, type=openapi.TYPE_STRING, required=True)],
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'quest_id': openapi.Schema(type=openapi.TYPE_INTEGER)
        },
        required=['quest_id']
    ),
    responses={
        200: openapi.Response('OK'),
        400: 'Bad Request'
    }
)
@api_view(['POST'])
@csrf_exempt
@require_http_methods(['POST'])
def questRequest(request):
    token = request.headers.get('Authorization')
    if not token:
        return JsonResponse({"error": "Token is required"}, status=400)
    try:
        payload = decode_token(token)
    except Exception as e:
        return JsonResponse({"error": "Invalid token, please sign in again"}, status=500)
    try:
        user = User.objects.get(id=payload['id'])
        if not user:
            return JsonResponse({"error": "User profile not found"}, status=404)
        quest_id = request.data.get('quest_id')
        if not quest_id:
            return JsonResponse({"error": "Quest id is required"}, status=400)
        quest = Quest.objects.get(id=quest_id)
        if not quest:
            return JsonResponse({"error": "Quest not found"}, status=404)
        quest_registration = QuestRegistration(quest=quest, user=user)
        quest_registration.full_clean()
        quest_registration.save()
        return JsonResponse({"message": "Request sent successfully"}, status=201)
    except ValidationError as e:
        return JsonResponse({"errors": e.message_dict}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    

@swagger_auto_schema(
    tags=['Quest'],
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
        quest.update(status=request.data.get('status'))
        return JsonResponse({"message": "Quest request updated successfully"}, status=200)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
    
    
@swagger_auto_schema(
    tags=['Quest'],
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