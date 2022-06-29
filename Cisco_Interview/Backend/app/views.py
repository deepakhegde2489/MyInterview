from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import logout
from .models import MyUser
from rest_framework import mixins, authentication
from django.db import IntegrityError

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def UserLogout(request):

    request.user.auth_token.delete()

    logout(request)

    return Response('User Logged out successfully')


class CreateStudent(APIView):

    def post(self,request):
        try:
            user = MyUser.objects.create_user(email =request.data['user'],password=request.data['password'],
                                          address = request.data['address'],is_admin =request.data['is_admin'] == 'on')
            return Response({"user": user.user})
        except Exception as e:
            if 'UNIQUE constraint' in str(e):
                message = "User Exist"
                amended_args = tuple([f'{e.args[0]}\n{message}', *e.args[1:]])
                e.args = amended_args
                raise
            else:
                raise Exception("Server not responding")






class LoginView(APIView):
    authentication_classes = ([authentication.TokenAuthentication])
    def get(self,request, user):
        data = MyUser.objects.get(user__iexact=user)
        content = {"user":data.user,"address":data.address,"is_admin":data.is_admin}
        return Response(content)

class AuthToken(ObtainAuthToken):
    permission_classes = ()
    authentication_classes = ()

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'user':user.user
        })

