#!/bin/sh

python manage.py migrate
daphne djangito.asgi:application --port=8000 --bind 0.0.0.0 -v2