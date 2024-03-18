interface Data {
  result: {
    id: string; // <IMAGE_ID>
    uploadURL: string; // https://upload.imagedelivery.net/<ACCOUNT_HASHED>/<IMAGE_ID>
  };
  success: boolean;
  errors: { code: number; message: string }[];
  messages: string[];
}

export const createPresignedUploadUrl = async (
  accountId: string,
  apiToken: string
) => {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/images/v2/direct_upload`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    }
  );
  const data = (await response.json()) as Data;
  return data;
};
