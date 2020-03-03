#!/bin/bash

# Snapshot creation, assumes "shift_db" as the DB name
DB_SNAPSHOT="blockchain.db.gz"
DB_PATH="/home/$USER/snapshots/"
DB_NAME="shift_db"

res=$(mkdir -p "home/$USER/snapshots/")
echo -n  "Dumping DB to filesytem..."
res=$(sudo -u postgres pg_dump  "$DB_NAME" | gzip -9 > "/home/$USER/snapshots/$DB_SNAPSHOT")
# res=$(sudo -u shiftcore mv "/home/$USER/$DB_SNAPSHOT" "$DB_PATH$DB_SNAPSHOT")
echo -n "Complete!"
