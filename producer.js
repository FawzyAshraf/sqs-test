import { sqsClient } from "./config.js";

const params = {
	DelaySeconds: 0,
	MessageAttributes: {
		fileName: {
			DataType: "String",
			StringValue: "tmp.mkv",
		},
	},
	MessageBody: "tmp.mkv",
	QueueUrl: process.env.QUEUEURL,
};

const run = async () => {
	try {
		const data = await sqsClient.sendMessage(params).promise();
		console.log("Success, message sent. MessageID:", data.MessageId);
		return data;
	} catch (err) {
		console.log("Error", err);
	}
};
await run();
