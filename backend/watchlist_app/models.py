from django.db import models
from user_app.models import User
from movieapi_app.models import Movie

class Watchlist(models.Model):
    name = models.CharField(
        max_length=100,
        blank=False,
        null=False,
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movies = models.ManyToManyField(Movie, related_name="watchlists")
    isPublic = models.BooleanField(
        null=False,             
    )
