#trainer_app.urls
from django.urls import path
from .views import Sign_up , Log_in, Info #, Log_out, Info

urlpatterns = [
    path('signup/', Sign_up.as_view(), name='signup'),
    path('login/', Log_in.as_view(), name='login'),
    path('info/', Info.as_view(), name='info'),
]