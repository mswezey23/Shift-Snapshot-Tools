#!/bin/bash

# Snapshot creation, assumes "shift_db" as the DB name
DB_SNAPSHOT="blockchain.db.gz"
DB_PATH="/home/shiftcore/snapshot-spaces/snapshots/"
DB_NAME="shift_db"

#if [ "$EUID" -ne 0 ]
#  then echo "Please run as root"
#  exit
#fi

echo -n  "Dumping DB to filesytem..."
#su postgres pg_dump shift_db | gzip -9 > "$DB_PATH$DB_SNAPSHOT"
#res=$(sudo -u postgres pg_dump  "$DB_NAME" | gzip -9 > "$DB_PATH$DB_SNAPSHOT")

#res=$(sudo -u postgres pg_dump  "$DB_NAME" | gzip -9 > "/home/shiftcore/$DB_SNAPSHOT")
res=$(sudo -u shiftcore mv "/home/shiftcore/$DB_SNAPSHOT" "$DB_PATH$DB_SNAPSHOT")

echo -n "Complete..."
