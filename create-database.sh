#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
    DO \$\$
    BEGIN
        -- Check if the user exists
        IF NOT EXISTS (
            SELECT
            FROM pg_catalog.pg_user
            WHERE usename = 'dev_user') THEN

            -- Create the user if it does not exist
            CREATE USER dev_user WITH ENCRYPTED PASSWORD 'password';
            GRANT dev_user to postgres;
        END IF;
    END\$\$;
    CREATE DATABASE main_db OWNER dev_user;
EOSQL

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname main_db <<-EOSQL
    CREATE SCHEMA main;
    CREATE SCHEMA types;
    CREATE EXTENSION postgis;
    GRANT ALL PRIVILEGES ON SCHEMA main TO dev_user;
    GRANT ALL PRIVILEGES ON SCHEMA types TO dev_user;
EOSQL
