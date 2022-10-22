import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
from django.urls import re_path
from api.consumers import HealthDataConsumer

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django_asgi_app = get_asgi_application()


application = ProtocolTypeRouter({
    "http": django_asgi_app,

    "websocket": URLRouter([
        re_path(r"ws/health-data/(?P<room_name>\w+)/$", HealthDataConsumer.as_asgi()),
    ])
})
