import ImageKit, { toFile } from "@imagekit/nodejs";
import { config } from "../config/config.js";

const client = new ImageKit({
  privateKey: config.IMAGEKIT_PRIVATE_KEY,
  publicKey: config.IMAGEKIT_PUBLIC_KEY
});

export const uploadFile = async ({ buffer, fileName }) => {
  const res = await client.files.upload({
    file: await toFile(buffer),
    fileName: fileName
  });

  return res
};
