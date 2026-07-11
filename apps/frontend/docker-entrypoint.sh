#!/bin/sh
set -e

# Replace environment variables in nginx config
envsubst '${BACKEND_URL}' < /etc/nginx/nginx.conf > /etc/nginx/nginx.conf.tmp
mv /etc/nginx/nginx.conf.tmp /etc/nginx/nginx.conf

# Execute the main command
exec "$@"

