from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r"ws/health-data/(?P<room_name>\w+)/$", consumers.HealthDataConsumer.as_asgi()),
]