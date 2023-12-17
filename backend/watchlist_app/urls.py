#trainer_app.urls
from django.urls import path
from .views import AllWatchlists, SingleWatchlist, MovieInWatchlist

urlpatterns = [
    path('', AllWatchlists.as_view(), name='watchlists'),
    path('<int:id>', SingleWatchlist.as_view(), name='watchlist'),
    path('<int:id>/movie', MovieInWatchlist.as_view(), name='watchlist'),
    path('<int:watchlist_id>/movie/<int:movie_id>', MovieInWatchlist.as_view(), name='watchlist'),
]