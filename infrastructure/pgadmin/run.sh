
#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ENV_FILE="$SCRIPT_DIR/.env"
CONTAINER_NAME="rift-hub-pgadmin"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "Environment file not found: $ENV_FILE" >&2
  exit 1
fi

set -a
source "$ENV_FILE"
set +a

: "${PGADMIN_PORT:?Missing PGADMIN_PORT in $ENV_FILE}"
: "${PGADMIN_DEFAULT_EMAIL:?Missing PGADMIN_DEFAULT_EMAIL in $ENV_FILE}"
: "${PGADMIN_DEFAULT_PASSWORD:?Missing PGADMIN_DEFAULT_PASSWORD in $ENV_FILE}"

echo "Starting pgAdmin..."

docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true

docker run \
  --name "$CONTAINER_NAME" \
  -p "${PGADMIN_PORT}:80" \
  -e PGADMIN_DEFAULT_EMAIL="${PGADMIN_DEFAULT_EMAIL}" \
  -e PGADMIN_DEFAULT_PASSWORD="${PGADMIN_DEFAULT_PASSWORD}" \
  -v rift-hub-pgadmin-data:/var/lib/pgadmin \
  -d dpage/pgadmin4:latest

echo "pgAdmin UI: http://localhost:${PGADMIN_PORT}"
echo "Login:      ${PGADMIN_DEFAULT_EMAIL}"
