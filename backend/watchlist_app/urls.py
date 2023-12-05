#trainer_app.urls
from django.urls import path
from .views import 

urlpatterns = [
    path('', Sign_up.as_view(), name='watchlists')
]