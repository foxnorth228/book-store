#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env"
CONTAINER_NAME="rift-hub-redis"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Environment file not found: $ENV_FILE" >&2
  exit 1
fi

set -a
source "$ENV_FILE"
set +a

: "${REDIS_PORT:?Missing REDIS_PORT in $ENV_FILE}"
: "${REDIS_PASSWORD:?Missing REDIS_PASSWORD in $ENV_FILE}"

echo "Starting Redis..."

docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true

docker run \
  --name "$CONTAINER_NAME" \
  -p "${REDIS_PORT}:6379" \
  -v rift_hub_redis:/data \
  -d redis:8 \
  redis-server --requirepass "$REDIS_PASSWORD"

echo "Redis running:"
echo "  redis://localhost:$REDIS_PORT"