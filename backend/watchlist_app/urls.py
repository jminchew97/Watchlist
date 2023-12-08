#trainer_app.urls
from django.urls import path
from .views import AllWatchlists, SingleWatchlist

urlpatterns = [
    path('', AllWatchlists.as_view(), name='watchlists'),
    path('<int:id>', SingleWatchlist.as_view(), name='watchlist'),
]