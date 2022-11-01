import { sqsClient, s3Client } from "./config.js";
import fs from "fs";
import dotenv from "dotenv";

const params = {
	QueueUrl: process.env.QUEUEURL,
	MaxNumberOfMessages: 1,
	MessageAttributeNames: ["fileName"],
	VisibilityTimeout: 2 * 60 * 60,
	WaitTimeSeconds: 20,
};

const run = async () => {
	try {
		const data = await sqsClient.receiveMessage(params).promise();
		const key = data.Messages[0].MessageAttributes.fileName.StringValue;
		const dest = {
			Bucket: "fawzypuppeteuw",
			Key: key,
		};
		const file = await s3Client.getObject(dest).promise();
		const inputStream = file.Body;
		fs.writeFileSync("./test.mkv", inputStream);
		const deleteParams = {
			QueueUrl: process.env.QUEUEURL,
			ReceiptHandle: data.Messages[0].ReceiptHandle,
		};
		await sqsClient.deleteMessage(deleteParams).promise();
		return data;
	} catch (err) {
		console.log("Error", err);
	}
};
await run();
