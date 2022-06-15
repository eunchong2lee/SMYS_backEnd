require('dotenv').config();
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_KEY,
	region: process.env.AWS_BUCKET_REGION,
  correctClockSkew: true
});
module.exports = s3;