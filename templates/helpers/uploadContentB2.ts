import { createHash } from "crypto";

import dotenv from "dotenv";
import fetch from "isomorphic-fetch";

interface B2AuthResp {
  absoluteMinimumPartSize: number;
  accountId: string;
  allowed: {
    bucketId: string;
    bucketName: string;
    capabilities: string[];
    namePrefix: null;
  };
  apiUrl: string;
  authorizationToken: string;
  downloadUrl: string;
  recommendedPartSize: number;
  s3ApiUrl: String;
}

interface B2AuthTokens {
  apiUrl: string;
  authorizationToken: string;
  downloadUrl: string;
  recommendedPartSize: number;
}

interface B2Error {
  status: number;
  code: string;
  message: string;
}

interface B2UploadResp {
  fileId: string;
  fileName: string;
  accountId: string;
  bucketId: string;
  contentLength: number;
  contentSha1: string;
  contentType: string;
  fileInfo: {
    author: string;
  };
  serverSideEncryption: {
    algorithm: string;
    mode: string;
  };
}

interface B2UploadTokens {
  endpoint: string;
  authToken: string;
  downloadUrl: string;
}

interface B2UpUrlResp {
  bucketId: string;
  uploadUrl: string;
  authorizationToken: string;
}

dotenv.config();

const APP_KEY_ID = process.env.B2_APP_KEY_ID;
const APP_KEY = process.env.B2_APP_KEY;
const BUCKET_ID = process.env.B2_BUCKET_ID;
const BUCKET_NAME = process.env.B2_BUCKET_NAME;

/**
 * Authorize B2 bucket for upload.
 * docs: https://www.backblaze.com/b2/docs/b2_authorize_account.html
 *
 * @returns api endpoint, auth token, and download url
 */
const authTokens = async (): Promise<B2AuthTokens> => {
  const token = Buffer.from(`${APP_KEY_ID}:${APP_KEY}`).toString("base64");
  const options = {
    headers: {
      Authorization: `Basic ${token}`,
    },
  };

  try {
    const response = await fetch(
      "https://api.backblazeb2.com/b2api/v2/b2_authorize_account",
      options
    );

    if (response.status !== 200) {
      const results: B2Error = await response.json();
      const msg = results.message || results.code;

      throw new Error(
        `Getting B2 authentication keys: \n ${results.status}: ${msg}`
      );
    }

    const results: B2AuthResp = await response.json();
    const data: B2AuthTokens = {
      apiUrl: results.apiUrl,
      authorizationToken: results.authorizationToken,
      downloadUrl: results.downloadUrl,
      recommendedPartSize: results.recommendedPartSize,
    };

    return data;
  } catch (error) {
    throw new Error(`Getting B2 authentication keys: \n ${error}`);
  }
};

/**
 * Get B2 endpoint for upload.
 * docs: https://www.backblaze.com/b2/docs/b2_get_upload_url.html
 *
 * @returns upload endpoint, auth token, and download url
 */
const getUploadUrl = async (): Promise<B2UploadTokens> => {
  try {
    const authData = await authTokens();
    const options = {
      method: "POST",
      headers: {
        Authorization: authData?.authorizationToken ?? "",
      },
      body: JSON.stringify({
        bucketId: BUCKET_ID,
      }),
    };
    const response = await fetch(
      `${authData?.apiUrl}/b2api/v1/b2_get_upload_url`,
      options
    );

    if (response.status !== 200) {
      const results: B2Error = await response.json();
      const msg = results.message || results.code;

      throw new Error(`Getting B2 upload URL: \n ${response.status}: ${msg}`);
    }

    const results: B2UpUrlResp = await response.json();
    const endpoint = results.uploadUrl;
    const authToken = results.authorizationToken;

    return {
      endpoint,
      authToken,
      downloadUrl: authData?.downloadUrl ?? "",
    };
  } catch (error) {
    throw new Error(`Getting B2 upload URL: \n ${error}`);
  }
};

/**
 * Upload file to B2 bucket.
 * docs: https://www.backblaze.com/b2/docs/b2_upload_file.html
 *
 * @param data file buffer
 * @param name file name with extension
 * @param [type] file type
 * @returns file public url
 */
export const uploadToB2 = async (
  data: Buffer,
  name: string,
  type?: string
): Promise<string> => {
  try {
    const authData = await getUploadUrl();
    const hash = createHash("sha1").update(data).digest("hex");
    const options = {
      method: "POST",
      headers: {
        Authorization: authData?.authToken ?? "",
        "X-Bz-File-Name": name,
        "Content-Type": type || "b2/x-auto",
        "Content-Length": `${data.length}`,
        "X-Bz-Content-Sha1": hash,
        "X-Bz-Info-Author": "gh-action",
      },
      body: data,
    };
    const response = await fetch(authData?.endpoint ?? "", options);

    if (response.status !== 200) {
      const results: B2Error = await response.json();
      const msg = results.message || results.code;

      throw new Error(
        `Uploading file to B2 - ${name}: \n ${results.status}: ${msg}`
      );
    }

    const results: B2UploadResp = await response.json();

    console.info(`[SUCCESS] - Uploaded '${results.fileName}' to B2.`);

    return `${authData?.downloadUrl}/file/${BUCKET_NAME}/${results.fileName}`;
  } catch (error) {
    throw new Error(`Uploading file to B2 - ${name}: \n ${error}`);
  }
};
