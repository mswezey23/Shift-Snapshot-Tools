# Shift-Snapshot
# Developed by: Matt Swezey

# Creating Snapshots
## Setup
TODO

## Usage
TODO

# Uploading Snapshots
## Setup
Create `.env` file with the following properties: 
```
NETTYPE=mainnet
S3_ENDPOINT={API_ENDPOINT}
S3_KEY={ACCESS_KEY}
S3_SECRET={SECRET_KEY}
```
Note: replace {API_ENDPOINT}, {ACCESS_KEY}, & {SECRET_KEY} with the proper string.

## Usage
`node app.js blockchain.db.gz`
* Will prompt user for path to file. Only the path, not the file name.
* Will upload file to the S3 bucket and return the location (URL) for direct download.

# Restoring Node using Snapshot
Utilize `./shift_manager.sh rebuild` 
