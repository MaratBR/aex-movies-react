#!/bin/sh
cat /index.html.tmpl | sed 's@!!!API_PLACEHOLDER!!!@'"$API_URL"'@'>/dist/index.html
echo "index.html has been updated"
