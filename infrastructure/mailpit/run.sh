#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env"
CONTAINER_NAME="rift-hub-mailpit"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Environment file not found: $ENV_FILE" >&2
  exit 1
fi

set -a
source "$ENV_FILE"
set +a

: "${SMTP_PORT:?Missing SMTP_PORT in $ENV_FILE}"
: "${SMTP_WEB_PORT:?Missing SMTP_WEB_PORT in $ENV_FILE}"

echo "Starting Mailpit..."

docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true

docker run \
  --name "$CONTAINER_NAME" \
  -p "${SMTP_PORT}:1025" \
  -p "${SMTP_WEB_PORT}:8025" \
  -d axllent/mailpit

echo "Mailpit SMTP: localhost:${SMTP_PORT}"
echo "Mailpit UI:   http://localhost:${SMTP_WEB_PORT}"