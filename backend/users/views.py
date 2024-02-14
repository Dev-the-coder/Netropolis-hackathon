import jwt
from datetime import datetime, timedelta
from django.conf import settings
from django.shortcuts import render, HttpResponse
from users.models import User
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError

SECRET_KEY = 'sedfj23j3h48934ugj43h83tn4hiu'  # Replace with your own secret key

def create_token(email):
    payload = {
        'email': email,
        'exp': datetime.utcnow() + timedelta(days=1),
        'iat': datetime.utcnow(),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm='HS256')

def decode_token(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return {"error": "Token has expired"}

@csrf_exempt 
@require_http_methods(['POST'])
def register(request):
    user_details = json.loads(request.body)
    try:
        user = User(**user_details)
        user.full_clean()
        print("User is valid")
        user.save()
        token = create_token(user.email)
        return JsonResponse({"message": "User registered successfully", "token": token}, status=201)
    except ValidationError as e:
        return JsonResponse({"errors": e.message_dict}, status=400)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@csrf_exempt 
@require_http_methods(['POST'])
def login(request):
    try:
        user_details = json.loads(request.body)
    except json.JSONDecodeError as e:
        return JsonResponse({"error": "Invalid JSON "+ str(e)}, status=400)
    try:
        user = User.objects.get(email=user_details.get('email'))
        if user.password == user_details.get('password'):
            token = create_token(user.email)
            return JsonResponse({"message": "Login successful", "token": token}, status=200)
        else:
            return JsonResponse({"error": "Invalid password"}, status=400)
    except User.DoesNotExist:
        return JsonResponse({"error": "User does not exist"}, status=404)

@csrf_exempt
@require_http_methods(['GET'])
def get_user(request):
    token = request.headers.get('Authorization')
    if not token:
        return JsonResponse({"error": "Token is required"}, status=400)
    payload = decode_token(token)
    if "error" in payload:
        return JsonResponse(payload, status=401)
    try:
        user = User.objects.get(email=payload.get('email'))
        # return JsonResponse({"user": user.__dict__}, status=200)
        return JsonResponse({"user": {
            "name": user.name,
            "dob": user.dob,
            "persona": user.persona,
            "location": user.location,
            "points": user.points,
            "field_of_specialization": user.field_of_specialization,
            "completed_quest_tags": user.completed_quest_tags,
            "active_quest": user.active_quest,
            "email": user.email,
        }}, status=200)
    except User.DoesNotExist:
        return JsonResponse({"error": "User does not exist"}, status=404)