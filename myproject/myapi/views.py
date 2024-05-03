from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from myapi.models import React
from myapi.serializers import ReactSerializers
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


@api_view(['GET'])
def hello_world(request):
    return Response({'message': 'Only Hello!'})

@api_view(['GET'])
def hello_all(request):
    return Response({'hello': 'Hello All!'})

@api_view(['POST'])
def hello_react(request):
    return Response({'react': request.data})
    
@csrf_exempt
def react_list(request):
    if request.method == 'GET':
        react = React.objects.all()
        serializer = ReactSerializers(react, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ReactSerializers(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
def react_detail(request, pk):
    try:
        react = React.objects.get(pk=pk)
    except React.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ReactSerializers(react)
        return Response(serializer.data)

    elif request.method == 'DELETE':
        react.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)