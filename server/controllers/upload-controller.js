const express = require("express");
const router = express.Router();
const {
  upload,
  getListFiles,
  getFile,
  download,
  uploadByLink,
} = require("../repositories-DAL/upload-repository");

router.post("/upload-by-link", async (req,res)=>{
  try {
    const {link} = req.body;
    if(!link) return res.status(400).send("Link is required");
     const  fileData = await uploadByLink(link);
     res.status(200).json(fileData);
  } catch (error) {
    throw error;
  }
});
router.post("/upload", upload);
router.get("/files", getListFiles);
router.get("/file", getFile);
router.get("/files/:name",download);



module.exports = router;
