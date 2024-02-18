from django.shortcuts import render
from django.contrib.auth import authenticate

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

from dotenv import dotenv_values
import requests

MOVIE_API_KEY = dotenv_values()["MOVIE_API_KEY"]

class SearchForMovie(APIView):
    def get(self, request, search_string):
        url = f"https://api.themoviedb.org/3/search/movie?query={search_string}&include_adult=false&language=en-US&page=1"

        headers = {
        "accept": "application/json",
        "Authorization": f"Bearer {MOVIE_API_KEY}"
        }

        response = requests.get(url, headers=headers)
        return Response(response.json())
    
class GetPopularMovies(APIView):
    
    def get(self, request):
        url = "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1"
        
        headers = {
            "accept": "application/json",
            "Authorization": f"Bearer {MOVIE_API_KEY}"
            }

        response = requests.get(url, headers=headers)
        return Response(response.json())
    
class TopRated(APIView):
    
    def get(self, request):
        url = "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
        
        headers = {
            "accept": "application/json",
            "Authorization": f"Bearer {MOVIE_API_KEY}"
            }

        response = requests.get(url, headers=headers)
        return Response(response.json())