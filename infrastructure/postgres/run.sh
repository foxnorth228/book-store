#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env"
CONTAINER_NAME="rift-hub-postgres"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Environment file not found: $ENV_FILE" >&2
  exit 1
fi

set -a
source "$ENV_FILE"
set +a

: "${DB_USER:?Missing DB_USER in $ENV_FILE}"
: "${DB_PASSWORD:?Missing DB_PASSWORD in $ENV_FILE}"
: "${DB_PORT:?Missing DB_PORT in $ENV_FILE}"

echo "Starting Postgres..."

docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true

docker run \
  --name "$CONTAINER_NAME" \
  -e POSTGRES_USER="$DB_USER" \
  -e POSTGRES_PASSWORD="$DB_PASSWORD" \
  -p "${DB_PORT}:5432" \
  -v rift_hub_pg:/var/lib/postgresql/data \
  -d postgres:17

echo "Postgres running on port $DB_PORT"