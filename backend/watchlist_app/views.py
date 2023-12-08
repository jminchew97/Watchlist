from django.contrib.auth import authenticate

from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST
)
import json
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from .serializers import WatchlistSerializer,MovieSerializer, CreateWatchlistSerializer, EditWatchlistSerializer
from .models import Watchlist,Movie

class AllWatchlists(APIView):
    def get(self, request):
        
        
        watchlists = Watchlist.objects.filter(isPublic=True)
        
        data = WatchlistSerializer(watchlists, many=True).data
        
        # Return the JSON response
        return JsonResponse({"watchlists":data})
    
    def post(self, request):
        new_watchlist = CreateWatchlistSerializer(data=request.data)
        
        if new_watchlist.is_valid():
            new_watchlist.save()
            return JsonResponse(new_watchlist.data)
        
        return JsonResponse({"message":new_watchlist.errors}, status=HTTP_400_BAD_REQUEST)
    
    
class SingleWatchlist(APIView):
    def get(self, request, id):
        
        try:
            watchlist = Watchlist.objects.get(isPublic=True, id=id)
            if watchlist:
                data = WatchlistSerializer(watchlist).data
                return JsonResponse({"data":data})
        except Exception as e:
            print(e)
            return Response(f"No watchlist with id:{id} or watchlist is set to private", status=HTTP_404_NOT_FOUND)
    def put(self, request, id):
        watchlist = get_object_or_404(Watchlist, id=id)
        
        serializer = EditWatchlistSerializer(watchlist, data=request.data["data"])
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)
    def delete(self,request,id):
        watchlist = get_object_or_404(Watchlist, id=id)
        watchlist.delete()
        return Response(status=HTTP_204_NO_CONTENT)