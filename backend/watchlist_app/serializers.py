from rest_framework import serializers # import serializers from DRF
from .models import Watchlist, Movie # WatchlistItem,


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = '__all__'
        
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