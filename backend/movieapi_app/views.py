from django.shortcuts import render


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
from django.shortcuts import get_object_or_404

from .serializers import MovieSerializer
from .models import Movie


class GetMovie(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    def get(self, request, id):
        if id.isdigit():
            movie = Movie.objects.get(id=id)
            data = MovieSerializer(movie).data
        
        # Return the JSON response
        return JsonResponse({"data":data})
    
    # def post(self, request):
    #     try:
    #         new_watchlist = CreateWatchlistSerializer(data=request.data)
            
    #         if not new_watchlist.is_valid():
    #             return JsonResponse({"message":new_watchlist.errors}, status=HTTP_400_BAD_REQUEST)
            
    #         attempted_user_assigned = request.data["user"]
    #         authenticated_user= request.user
    #         if authenticated_user.id == attempted_user_assigned or authenticated_user.is_staff:
    #             new_watchlist.save()
    #             return JsonResponse(new_watchlist.data)
            
    #         if authenticated_user.id != attempted_user_assigned:
    #             return JsonResponse({"message":f"watchlist user_id:{attempted_user_assigned} does not match authenticated user id:{authenticated_user.id}"}, status=HTTP_400_BAD_REQUEST)
            
    #         return JsonResponse(new_watchlist.errors, status=HTTP_400_BAD_REQUEST)
    #     except Exception as e:
    #         print(e)
    #         return JsonResponse({"message":"server error processing request"}, status=HTTP_500_INTERNAL_SERVER_ERROR)
        