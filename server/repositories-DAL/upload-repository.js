const uploadFile = require("../services-BL/upload-service");
const fs = require("fs");
const imageDownloader = require("image-downloader");

const uploadByLink = async ( link ) => {
  try {
    
    const newName = Date.now() + ".jpg";
    await imageDownloader.image({
      url: link,
      dest: `${__basedir}/server/storage-files/${newName}`,
    });
    
    return newName;
  } catch (error) {
    throw error;
  }
};

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(201).json(req.file.filename );
  } catch (err) {
    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }
    res.status(500).send({
      message: `Could not upload the file: ${req.file?.originalname}. ${err}`,
    });
  }
};

const getFile = (req, res) => {
  const directoryPath = __basedir + "/server/storage-files";

  fs.readdir(directoryPath, function (err, file) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    const baseUrl = "http://localhost:3000/file/files";
    let fileInfo = { 
      name: file,
      url: baseUrl + file,
    };
    res.status(200).send(fileInfo);
  });
};
const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/server/storage-files";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    const baseUrl = "http://localhost:3000/file/files";
    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/server/storage-files/" + fileName;

  res.download(directoryPath, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + req.params.name + " " + err,
      });
    }
  });
};

module.exports = {
  upload,
  getListFiles,
  getFile,
  download,
  uploadByLink,
};
