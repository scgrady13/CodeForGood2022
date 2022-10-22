#!/bin/bash

gunicorn server.wsgi:application --bind 0.0.0.0:8000

exec "$@"