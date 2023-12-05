from django.contrib.auth import authenticate

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_404_NOT_FOUND,
    HTTP_204_NO_CONTENT,
)
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class AllWatchlists(APIView):
    def get(self, request):
        # print(request.data)
        
        
        # user = User.objects.create_user(**request.data)
        # print(user)
        # token = Token.objects.create(user=user)
        return Response(
            True
        )
        