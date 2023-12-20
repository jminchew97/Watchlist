from rest_framework import serializers # import serializers from DRF
from .models import User # WatchlistItem,


class UserMinimalSerializer(serializers.ModelSerializer):

    
    class Meta:
        model = User
        fields = ["username"]