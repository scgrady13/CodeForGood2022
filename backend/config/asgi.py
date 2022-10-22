import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from django.urls import re_path

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django_asgi_app = get_asgi_application()

from api.consumers import HealthDataConsumer

application = ProtocolTypeRouter({
    "http": django_asgi_app,

    "websocket": URLRouter([
        re_path(r"ws/health-data/(?P<room_name>\w+)/$", HealthDataConsumer.as_asgi()),
    ])
})
