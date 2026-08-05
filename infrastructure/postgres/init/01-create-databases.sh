#!/usr/bin/env bash
set -e

echo "Creating databases..."

databases=(
  "auth_db"
  "profile_db"
)

for db in "${databases[@]}"; do
  echo "Ensuring database '$db' exists..."

  psql \
    --username "$POSTGRES_USER" \
    --dbname postgres \
    <<EOSQL
SELECT 'CREATE DATABASE "$db"'
WHERE NOT EXISTS (
    SELECT FROM pg_database WHERE datname = '$db'
)\gexec
EOSQL

done

echo "Done."