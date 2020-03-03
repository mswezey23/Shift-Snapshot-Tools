/* eslint-disable no-console */
const UploadToS3Bucket = require('./src/uploadSnapshot');

const args = process.argv.slice(2);
const fileName = args[0];

/**
 * Requires .env file to be created.
 * WARNING:
 *   do not commit and push .env file to repo!
 *   check .gitignore file to make sure it's ignored!
 * Usage:
 *   'node app.js blockchain.db.gz' -> prompts user for file path -> uploads to buck
 */
UploadToS3Bucket(fileName);
