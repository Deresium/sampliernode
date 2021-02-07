import aws from "aws-sdk"

const credentials = new aws.Credentials(process.env.AWS_KEY_ID, process.env.AWS_KEY_SECRET);
const s3 = new aws.S3({
	credentials: credentials
})

const sendToAWS = async(file: Buffer, fileName: string) => {
	const params = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: fileName,
		Body: file
	}
	
	await s3.putObject(params).promise();
}

const getFromAWS = async(fileName: string) => {
	const params = {
		Bucket: process.env.AWS_BUCKET_NAME,
		Key: fileName
	}
	
	const response = await s3.getObject(params).promise();
	return response.Body;
}

export {
	sendToAWS,
	getFromAWS
}