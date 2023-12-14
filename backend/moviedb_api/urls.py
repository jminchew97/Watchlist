
from django.urls import path
from .views import SearchForMovie

urlpatterns = [
    path('<search_string>', SearchForMovie.as_view(), name='search-movie'),
]