import { uploadFile } from "../services/storage.service.js";

export const createProduct = async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  const filesUrls = [];

  for (let i = 0; i < req.files.length; i++) {
    const res = await uploadFile({
      buffer: req.files[i].buffer,
      fileName: req.files[i].originalName,
    });

    console.log(res);
  }

  res.status(200).json({
    message: "Dummy res.",
  });
};
