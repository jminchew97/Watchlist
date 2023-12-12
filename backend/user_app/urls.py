#trainer_app.urls
from django.urls import path
from .views import Sign_up , Log_in, Info , Log_out, GetWatchlistByUser

urlpatterns = [
    path('signup/', Sign_up.as_view(), name='signup'),
    path('login/', Log_in.as_view(), name='login'),
    path('info/', Info.as_view(), name='info'),
    path('logout/', Log_out.as_view(), name='logout'),
    path("<int:id>/watchlists/", GetWatchlistByUser.as_view(), name="user_watchlists")
]