from django.contrib.auth import authenticate

from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
)
import json
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.core.serializers import serialize
from django.http import JsonResponse
from django.db.models import Prefetch

from .serializers import WatchlistSerializer, WatchlistItemSerializer, MovieSerializer
from .models import Watchlist, WatchlistItem, Movie

class AllWatchlists(APIView):
    def get(self, request):
        # watchlists = WatchlistSerializer(Watchlist.objects.all(), many=True)
        
        # print(watchlists.data)
        # # return JsonResponse({"watchlists": {watchlists.data}})
        watchlists = Watchlist.objects.prefetch_related(
        Prefetch('watchlistitem_set__movie', queryset=Movie.objects.all())
    ).all()

        # Serialize the data
        serialized_data = serialize('json', watchlists)

        # Parse the serialized data into Python objects
        deserialized_data = json.loads(serialized_data)

        # Extract the fields from each entry
        data = [entry['fields'] for entry in deserialized_data]
        print(data)
        # Return the JSON response
        return JsonResponse({'watchlists': data}, safe=False)
        