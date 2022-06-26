from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('live/', consumers.CiscoAlertMessaging.as_asgi()),
    path('socket.io/<str:hello>', consumers.CiscoAlertMessaging.as_asgi()),
]