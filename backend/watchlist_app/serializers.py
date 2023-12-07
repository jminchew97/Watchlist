from rest_framework import serializers # import serializers from DRF
from .models import Watchlist, WatchlistItem, Movie


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'
        
class WatchlistItemSerializer(serializers.ModelSerializer):
    movie = MovieSerializer()  
    class Meta:
        model = WatchlistItem
        fields = '__all__'
        
class WatchlistSerializer(serializers.ModelSerializer):
    watchlist_items = WatchlistItemSerializer(many=True, read_only=True)
    class Meta:
        model = Watchlist
        fields = "__all__"