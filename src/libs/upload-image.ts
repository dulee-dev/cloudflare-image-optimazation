interface Data {
  result: {
    id: string;
    filename: string;
    uploaded: string;
    requireSignedURLs: boolean;
    variants: string[]; // https://imagedelivery.net/<ACCOUNT_HASHED>/<IMAEG_ID>/<VARIANT>
  };
  success: boolean;
  errors: {
    code: number;
    message: string;
  }[];
  messages: string[];
}

export const uploadImage = async (url: string, formData: FormData) => {
  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });
  const data = (await response.json()) as Data;
  return data;
};
