from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from drf_yasg.utils import swagger_auto_schema
from rest_framework.decorators import api_view
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from quest.models import Quest
from dotenv import load_dotenv
import os
from openai import OpenAI
# from bing_chat import BingGPT


load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@swagger_auto_schema(
    tags=['Search'],
    method='get',
    operation_description='Get all tags.',
    responses={
        201: openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'tags': openapi.Schema(
                    type=openapi.TYPE_ARRAY,
                    items=openapi.Schema(type=openapi.TYPE_STRING)
                )
            }
        ),
        400: 'Bad Request'
    }
)
@api_view(['GET'])
@csrf_exempt
@require_http_methods(['GET'])
def getTags(request):
    tags = Quest.objects.values('tags').distinct()
    tags = [tag['tags'] for tag in tags]
    return JsonResponse({"tags": tags}, safe=False, status=201)

@swagger_auto_schema(
    tags=['Search'],
    method='get',
    operation_description='Search quests by tags. Takes a list of tags, separated by commas, and returns all the quests that have at least one of those tags.',
    manual_parameters=[
        openapi.Parameter(
            name='tags',
            in_=openapi.IN_QUERY,
            type=openapi.TYPE_STRING,
            description='Tags to search for',
            required=True
        )
    ],
    responses={
        201: openapi.Schema(
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
def searchByTags(request):
    tags = request.GET.get('tags')
    tags = tags.split(',')
    print(tags)
    quests = Quest.objects.filter(tags__in=tags)
    return JsonResponse({"quests": list(quests.values())}, safe=False, status=201)

@swagger_auto_schema(
    tags=['Search'],
    method='post',
    operation_description='Deep search for quests. This endpoint will take a phrase and then will search for similarity between this phrase and all the quests title, description and tags. If there is a match it will give back those quests. This uses GPT 3 model to find the similarity.',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'phrase': openapi.Schema(type=openapi.TYPE_STRING)
        }
    ),
    responses={
        201: openapi.Schema(
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
                        }
                    )
                )
            }
        ),
        400: 'Bad Request'
    }
)
@api_view(['POST'])
@csrf_exempt
@require_http_methods(['POST'])
def deepSearch(request):
    quests = Quest.objects.all()
    SystemMessage =  "You have to act as a checker endpoint. I will give you one phrase and then give you some data in the form of id, title, description, tags, and you have to select the closest data that match with the phrase. You have to only respond with the id. If the data which are relevant have id a, b, c, and d you have to return only a,b,c,d in single line without any spaces or line break. Select all that are close to the phrase. with just ids seperated by commas"
    ContentMessage = f'Phrase: {request.data.get("phrase")}. Data: '
    for quest in quests:
        ContentMessage += "{"+f' id:{quest.id}, title:{quest.title}, description:{quest.description}, tags:{quest.tags} ' + "}"
    
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": SystemMessage
            },
            {
                "role": "user",
                "content": ContentMessage
            }
        ]
    )
    res =  response.choices[0].message.content
    try:
        Ids = res.split(',')
        quests = Quest.objects.filter(id__in=Ids)
        return JsonResponse({"quests": list(quests.values())}, safe=False, status=201)
    except Exception as e:
        print(e)
        return JsonResponse({"response": res, "error": e}, safe=False, status=201)