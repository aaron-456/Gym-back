const { PutObjectCommand } = require('@aws-sdk/client-s3');
const S3Client = require('../utils/aws');

const uploadImage = async (file, prefix) => {
  const uniqueName = `${prefix}/${Date.now()}-${file.originalname}`;

  const s3 = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.AWS_PUBLIC_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    },
  });

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: uniqueName,
    Body: file.buffer,
  };

  const result = await s3.send(new PutObjectCommand(params));
  imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${uniqueName}`;

  return imageUrl;
};

module.exports = { uploadImage };
