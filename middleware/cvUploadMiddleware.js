const multer = require("multer");
const path = require("path");
const fs = require("fs").promises;

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + file.originalname.split('.').pop());
  }
});

const fileFilter = function(req, file, cb) {
  if (file.mimetype.startsWith("application/pdf")) {
    cb(null, true);
  } else {
    cb(new Error("Please upload only PDF files."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

//read file
const readFile = async (filePath) => {
  let data = { error: false, message: "" };
  try {

    const extName = path.extname(filePath).split(".").slice(1).join(".");
    const data = await fs.readFile(filePath, { encoding: "base64" });
    const result = "data:@file/" + extName + ";base64," + data;

    return result;
  } catch (error) {
    console.log(error.message);
    data = { error: true, message: "Something went wrong" };
    return data;
  }
};

const uploadFile = upload.single("cvFile");

module.exports = { uploadFile, readFile };
