from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from myapi.models import React
from myapi.serializers import ReactSerializers, UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate, login, logout

@csrf_exempt
def react_list(request, format=None):
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
def react_detail(request, pk, format=None):
    try:
        react = React.objects.get(pk=pk)
    except React.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ReactSerializers(react)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = ReactSerializers(react, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.error, status=status.HTTP_404_NOT_FOUND) 

    elif request.method == 'DELETE':
        react.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@csrf_exempt
def user_register(request):
    if request.method == 'GET':
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return JsonResponse(serializer.data, safe=False)

    
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)

class UserDetailAPI(APIView):
  authentication_classes = (TokenAuthentication,)
  permission_classes = (AllowAny,)
  def get(self,request,*args,**kwargs):
    user = User.objects.get(id=request.user.id)
    serializer = UserSerializer(user)
    return Response(serializer.data)

class UserLoginView(APIView):
    def post(self, request):
        user = authenticate(username=request.data['username'], password=request.data['password'])
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            return Response({'error': 'Invalid credentials'}, status=401)

class UserLogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': "Logout successful"})
