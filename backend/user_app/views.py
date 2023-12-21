from django.contrib.auth import authenticate
from .models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
)
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from watchlist_app.models import Watchlist
from watchlist_app.serializers import WatchlistSerializer
from django.utils.safestring import mark_safe
import requests
import html
class Sign_up(APIView):
    def post(self, request):
        url = f"https://api.thecatapi.com/v1/images/search"
        headers={"x-api-key":"live_tpjCWW1x5WMR2HKjX57FrUWghN8BUNHVMHNXrYDWn95UKEmtC26NNRmDnDSZKZs3"}
        response = requests.get(url, headers=headers)
        profile_picture = response.json()[0]["url"]
        data = request.data
        
        data["profile_picture"] = profile_picture
        print(data)
        user = User.objects.create_user(**request.data)
        
        token = Token.objects.create(user=user)

        
        return Response(
            {"user": user.email, "token": token.key}, status=HTTP_201_CREATED
        )

        
class Log_in(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "user": user.username, "id":user.id})
        else:
            return Response("No user matching credentials", status=HTTP_404_NOT_FOUND)

class Info(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"username": request.user.username})

class Log_out(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        request.user.auth_token.delete()
        return Response(status=HTTP_204_NO_CONTENT)
    
class GetWatchlistByUser(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id):
        try:
            watchlist = Watchlist.objects.filter( user_id=id)
            
            if watchlist:
                data = WatchlistSerializer(watchlist, many=True).data
                print(data)
                return JsonResponse({"data":data})
            else:
                return JsonResponse({"message":f"User with id:{id} has no watchlists."})
        except Exception as e:
            print(e)
            return JsonResponse({"message":f"Error"}, status=HTTP_404_NOT_FOUND)
        
    
    