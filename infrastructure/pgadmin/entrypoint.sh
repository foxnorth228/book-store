#!/usr/bin/env sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ENV_FILE="$SCRIPT_DIR/../docker-compose/.env"

if [ ! -f "$ENV_FILE" ]; then
  echo "Environment file not found: $ENV_FILE" >&2
  exit 1
fi

set -a
. "$ENV_FILE"
set +a

envsubst < "$SCRIPT_DIR/servers.json.template" \
  > "$SCRIPT_DIR/servers.json"

echo "Generated $SCRIPT_DIR/servers.json"