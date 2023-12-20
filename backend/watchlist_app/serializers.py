from rest_framework import serializers # import serializers from DRF
from .models import Watchlist, Movie # WatchlistItem,
from movieapi_app.serializers import MovieSerializer
from user_app.serializers import UserMinimalSerializer

class AllWatchlistSerializer(serializers.ModelSerializer):
    movies = MovieSerializer(many=True)
    user = UserMinimalSerializer()
    class Meta:
        model = Watchlist
        
        fields = ["id", "name", "user", "movies", "isPublic"]
        read_only_fields = ['user', 'id']
class WatchlistSerializer(serializers.ModelSerializer):
    movies = MovieSerializer(many=True)
    
    class Meta:
        model = Watchlist
        fields = ["id", "name", "user", "movies", "isPublic"]
        read_only_fields = ['user', 'id']
        
class CreateWatchlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Watchlist
        fields = ["id", "name", "user", "isPublic"]
        read_only_fields = ['id']
        
class EditWatchlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Watchlist
        fields = ["id", "user","name", "isPublic","movies"]
        read_only_fields = ['user', 'id']