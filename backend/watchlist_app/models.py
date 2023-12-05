from django.db import models
from user_app.models import User
# Create your models here.
class Watchlist(models.Model):
    name = models.CharField(
        max_length=100,
        blank=False,
        null=False
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    isPublic = models.BooleanField(
        null=False                  
                                   )
class WatchlistItem(models.Model):
    name = models.CharField(
        max_length=100,
        blank=False,
        null=False
    )
    watchlist = models.ForeignKey(Watchlist, on_delete=models.CASCADE)