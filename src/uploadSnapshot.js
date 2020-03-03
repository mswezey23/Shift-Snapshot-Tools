/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

require('dotenv').config();
const AWS = require('aws-sdk');
const fs = require('fs');
const prompt = require('prompt-sync')();

const endpoint = process.env.S3_ENDPOINT;
const key = process.env.S3_KEY;
const secret = process.env.S3_SECRET;
const netType = process.env.NETTYPE;

if (!netType || !secret || !key || !endpoint) {
  console.log('Please setup the .env file! \n See README.md');
  process.exit(1);
}

function getFile(fileName) {
  const path = prompt('Enter path to file: ');
  console.log(`Path Entered: \n ${path}`);
  console.log(`File Name Enter: \n ${fileName}`);

  const entirePath = `${path}/${fileName}`;

  if (!fs.existsSync(path) || !fs.lstatSync(path).isDirectory()) {
    console.log('Invalid path! \n Please check & retry.');
    process.exit(1);
  }

  if (!fs.existsSync(entirePath) || !fs.lstatSync(entirePath).isFile()) {
    console.log('File not found! \n Please check & retry.');
    process.exit(1);
  }

  const fileData = fs.createReadStream(entirePath);

  return fileData;
}

function uploadFile(fileData, fileName) {
  // Configure client for use with DO Spaces
  const s3 = new AWS.S3({
    computeChecksums: true,
    endpoint: new AWS.Endpoint(endpoint),
    accessKeyId: key,
    secretAccessKey: secret,
  });

  // requires a 'Body:' before upload
  const defaultParams = {
    Bucket: `shift-mn-snapshot/${netType}`,
    Key: 'blockchain.db.gz',
    ACL: 'public-read',
  };

  const fileParam = {
    ...defaultParams,
    Body: fileData,
    Key: fileName,
  };

  /**
    * Used for large files and/or streams.
    * Handles md5 checks, multipart uploads (concurrency), monitors progress
    */
  s3.upload(fileParam).on('httpUploadProgress', (evt) => {
    console.log('Progress:', evt.loaded, '/', evt.total);
  }).send((err, data) => {
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      console.log('Success!');
      console.log(`URL: ${data.Location}`);
      process.exit(0);
    }
  });
}

module.exports = function UploadToS3Bucket(fileName) {
  // default file name
  if (!fileName) {
    fileName = 'blockchain.db.gz';
  }

  const fileData = getFile(fileName);
  uploadFile(fileData, fileName);
};
