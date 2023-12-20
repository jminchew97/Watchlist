from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.status import (
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
    HTTP_400_BAD_REQUEST,
    HTTP_403_FORBIDDEN,
    HTTP_500_INTERNAL_SERVER_ERROR
)

from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

from .serializers import WatchlistSerializer,MovieSerializer, CreateWatchlistSerializer, EditWatchlistSerializer, AllWatchlistSerializer
from .models import Watchlist,Movie

class AllWatchlists(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request):
        
        
        watchlists = Watchlist.objects.filter(isPublic=True)
        
        data = AllWatchlistSerializer(watchlists, many=True).data
        
        # Return the JSON response
        return JsonResponse({"watchlists":data})
    
    def post(self, request):
        try:
            new_watchlist = CreateWatchlistSerializer(data=request.data)
            
            if not new_watchlist.is_valid():
                return JsonResponse({"message":new_watchlist.errors}, status=HTTP_400_BAD_REQUEST)
            
            attempted_user_assigned = request.data["user"]
            authenticated_user= request.user
            if authenticated_user.id == attempted_user_assigned or authenticated_user.is_staff:
                new_watchlist.save()
                return JsonResponse(new_watchlist.data)
            
            if authenticated_user.id != attempted_user_assigned:
                return JsonResponse({"message":f"watchlist user_id:{attempted_user_assigned} does not match authenticated user id:{authenticated_user.id}"}, status=HTTP_400_BAD_REQUEST)
            
            return JsonResponse(new_watchlist.errors, status=HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            return JsonResponse({"message":"server error processing request"}, status=HTTP_500_INTERNAL_SERVER_ERROR)
        
class SingleWatchlist(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, id):
        
        try:
            watchlist = Watchlist.objects.get(id=id)
            if watchlist:
                data = WatchlistSerializer(watchlist).data
                return JsonResponse({"data":data})
            
        except Exception as e:
            print(e)
            return JsonResponse({"message":f"No watchlist with id:{id} or watchlist is set to private"}, status=HTTP_404_NOT_FOUND)
        
    def put(self, request, id):
        watchlist = get_object_or_404(Watchlist, id=id)
        
        serializer = EditWatchlistSerializer(watchlist, data=request.data["data"])
        
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=HTTP_400_BAD_REQUEST)
    
    def delete(self,request,id):
        try:
            # get user id
            authenticated_user= request.user
            
            watchlist = get_object_or_404(Watchlist, id=id)
            if authenticated_user.id != watchlist.user.id and not authenticated_user.is_staff:
                return JsonResponse({"message":f"You do not have authorization to delete this watchlist.{authenticated_user.id}!={watchlist.user.id}"},status=HTTP_403_FORBIDDEN)
            
            watchlist.delete()
            print("working")
            return JsonResponse({"message":"Watchlist was successfully deleted"},status=HTTP_204_NO_CONTENT)
        except Exception as e:
            print(e)
            return JsonResponse({"message":"server error processing request"}, status=HTTP_500_INTERNAL_SERVER_ERROR)       

class MovieInWatchlist(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
  
    def put(self, request, id):
        """
        Add a movie to watchlist
        """
        data = request.data['data']
        watchlist_id = id
        watchlist = get_object_or_404(Watchlist, id=watchlist_id)
        current_movies = list([x.id for x in watchlist.movies.all()])
        
        
       
        movie = Movie.objects.filter(name=data['name'], release_date=data["release_date"])
        """
        If the movie does not exist we will create a new movie object in our database.
        """
        if not movie.exists():
            # create movie in database
            movie = Movie.objects.create(**data)
            movie_data = MovieSerializer(movie)
        else:
            movie = movie[0]
        
        watchlist.movies.add(movie)
        
        return JsonResponse({"message":True}) #TODO fix this
    
    def delete(self, request,watchlist_id, movie_id):
        """delete a movie from a watchlist"""
        watchlist = get_object_or_404(Watchlist, id=watchlist_id)
        movie = get_object_or_404(Movie, id=movie_id)
        
        watchlist.movies.remove(movie)
        return JsonResponse({"message":"true"})