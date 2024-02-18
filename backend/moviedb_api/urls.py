
from django.urls import path
from .views import SearchForMovie, GetPopularMovies, TopRated

urlpatterns = [
    path('search/<search_string>', SearchForMovie.as_view(), name='search-movie'),
    path('popular', GetPopularMovies.as_view(), name='get popular movies'),
    path('top-rated',TopRated.as_view(), name='get top rated movies'),
]