const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // nul --> error, "uploads/" --> data
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    console.log("in filename --> ", file);

    cb(null, Date.now()+ " - " + file.originalname);
  },
});

const upload = multer({storage})

module.exports = upload
