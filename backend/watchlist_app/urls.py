#trainer_app.urls
from django.urls import path
from .views import AllWatchlists

urlpatterns = [
    path('', AllWatchlists.as_view(), name='watchlists')
]