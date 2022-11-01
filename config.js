import AWS from "aws-sdk";
import dotenv from "dotenv";

const REGION = "eu-west-1";
dotenv.config(".env");
AWS.config.update({
	region: REGION,
	accessKeyId: process.env.ACCESSKEYID,
	secretAccessKey: process.env.SECRECTACCESSKEY,
});

export const sqsClient = new AWS.SQS({ apiVersion: "2016-11-15" });
export const s3Client = new AWS.S3({ apiVersion: "2016-11-15" });
