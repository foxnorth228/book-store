#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env"
CONTAINER_NAME="rift-hub-rabbitmq"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Environment file not found: $ENV_FILE" >&2
  exit 1
fi

set -a
source "$ENV_FILE"
set +a

: "${RABBITMQ_USER:?Missing RABBITMQ_USER in $ENV_FILE}"
: "${RABBITMQ_PASSWORD:?Missing RABBITMQ_PASSWORD in $ENV_FILE}"
: "${RABBITMQ_PORT:?Missing RABBITMQ_PORT in $ENV_FILE}"
: "${RABBITMQ_UI_PORT:?Missing RABBITMQ_UI_PORT in $ENV_FILE}"

echo "Starting RabbitMQ..."

docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true

docker run \
  --name "$CONTAINER_NAME" \
  -e RABBITMQ_DEFAULT_USER="$RABBITMQ_USER" \
  -e RABBITMQ_DEFAULT_PASS="$RABBITMQ_PASSWORD" \
  -e RABBITMQ_DEFAULT_VHOST="/" \
  -p "${RABBITMQ_PORT}:5672" \
  -p "${RABBITMQ_UI_PORT}:15672" \
  -v rift_hub_rabbitmq:/var/lib/rabbitmq \
  -d rabbitmq:4.3.2-management

echo "RabbitMQ running:"
echo "  AMQP: amqp://$RABBITMQ_USER:***@localhost:$RABBITMQ_PORT"
echo "  UI:   http://localhost:$RABBITMQ_UI_PORT"