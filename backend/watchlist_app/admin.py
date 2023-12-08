from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Watchlist,Movie # WatchlistItem, 

# Register your models here.
admin.site.register([Watchlist, Movie])