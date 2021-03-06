#!/bin/bash

# Snapshot creation, assumes "shift_db" as the DB name
DB_SNAPSHOT="blockchain.db.gz"
DB_PATH="/home/$USER/snapshots"
DB_NAME="shift_db"
DB_USER="shift"
SHIFT_CONFIG="/home/$USER/shift/config.json"

set_network() {
  if [ "$(grep "7337a324ef27e1e234d1e9018cacff7d4f299a09c2df9be460543b8f7ef652f1" $SHIFT_CONFIG )" ];then
    DB_NAME="shift_db"
    DB_USER="shift"
  elif [ "$(grep "cba57b868c8571599ad594c6607a77cad60cf0372ecde803004d87e679117c12" $SHIFT_CONFIG )" ];then
    DB_NAME="shift_db_testnet"
    DB_USER="shift_testnet"
  else
    NETWORK="unknown"
  fi
}

set_network
res=$(mkdir -p $DB_PATH)
res=$(touch $DB_PATH/$DB_SNAPSHOT)
printf "DB_NAME set to $DB_NAME\n"
printf "Dumping DB to filesytem...\n"
res=$(sudo -u postgres pg_dump  "$DB_NAME" | gzip -9 > "$DB_PATH/$DB_SNAPSHOT")
printf "Complete!\n"
