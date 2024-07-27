const { S3Client } = require('@aws-sdk/client-s3');

module.exports = S3Client;

// Opcionalmente, puedes exportar la configuración de credenciales también
module.exports.credentials = {
  accessKeyId: process.env.AWS_PUBLIC_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
};
