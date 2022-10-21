from .base import *
import os

if os.environ.get("ENVIRONMENT") == "production":
    from .prod import *
else:
    from .local import *
