from django.urls import path
from .views import GetMovie

urlpatterns = [
    # path('', GetAllMovies.as_view, name='all movies'),
    path('<id>', GetMovie.as_view(), name='get-movie'),
]

