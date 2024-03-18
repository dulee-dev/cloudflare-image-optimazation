import { readFileSync } from 'fs';
import { createPresignedUploadUrl } from './libs/create-presigned-upload-url';
import 'dotenv/config';
import { uploadImage } from './libs/upload-image';
import path from 'path';

const IMAGE_FILE_PATH = path.join(__dirname, '..', 'tmall-logo.png');

const convertImageFileToFormData = (
  imageFilePath: string,
  fileName: string
) => {
  const image = readFileSync(imageFilePath);
  const formData = new FormData();
  const blobData = new Blob([image]);
  formData.append('file', blobData, fileName);
  return formData;
};

const main = async () => {
  const {
    result: { uploadURL },
  } = await createPresignedUploadUrl(
    process.env.ACCOUNT_ID,
    process.env.API_TOKEN
  );
  const formData = convertImageFileToFormData(IMAGE_FILE_PATH, 'fileName.png');
  await uploadImage(uploadURL, formData);
};

main();
