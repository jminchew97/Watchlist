from django.db import models
from user_app.models import User
from movieapi_app.models import Movie
# Create your models here.
# class Movie(models.Model):
#     name = models.CharField(
#         max_length=255,
#         null=False,
#         blank=False,
#     )
#     release_date = models.DateField()
#     summary = models.CharField(
#         max_length=255,
#         )
    
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
    


# class WatchlistItem(models.Model):
#     watchlist = models.ForeignKey(Watchlist, on_delete=models.CASCADE)
    
#     movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    

