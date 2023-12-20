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
# Create your views here.
import requests
class SearchForMovie(APIView):
    # authentication_classes = [TokenAuthentication]
    # permission_classes = [IsAuthenticated]


    
    def get(self, request, search_string):
        url = f"https://api.themoviedb.org/3/search/movie?query={search_string}&include_adult=false&language=en-US&page=1"

        headers = {
        "accept": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1Yzg0OTczMzQyZjA2N2Q4YTllZTAyYTNkMjIzNmFhMSIsInN1YiI6IjY1NjYyNmI4MTU2Y2M3MDEyZDU1MmRhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GWRa2_qF9X1p6JPSjruqHXToZ1F8UBVbaTcyzsqxwYM"
        }
        response = requests.get(url, headers=headers)
        # https://image.tmdb.org/t/p/w500/movie-image-path.jpg
        return Response(response.json())