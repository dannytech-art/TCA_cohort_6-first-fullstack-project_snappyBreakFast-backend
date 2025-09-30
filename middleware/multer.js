const multer = require("multer");

// ✅ Store files in memory instead of disk
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // accept file
  } else {
    cb(new Error("Invalid file type, only image is allowed!"), false); // reject file
  }
};

const limits = {
  fileSize: 1024 * 1024 * 3, // 3MB file size limit
};

const upload = multer({
  storage,
  fileFilter,
  limits,
});

module.exports = upload;
