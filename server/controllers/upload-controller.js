const express = require("express");
const multer = require('multer');
const Document = require('../models/department.model');
const router = express.Router();
const {
  upload,
  getListFiles,
  getFile,
  download,
  uploadByLink,
} = require("../repositories-DAL/upload-repository");

// const upload = multer({ dest: 'uploads/' });

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

// // Upload a new document
// router.post('/upload-documents', upload.single('file'), async (req, res) => {
//   const { name, type } = req.body;
//   const size = req.file.size;
//   const filePath = req.file.path;
//   const document = new Document({ name, type, size, filePath });
//   await document.save();
//   res.status(201).send(document);
// });
// Fetch all documents
router.get('/documents', async (req, res) => {
  const documents = await Document.find();
  res.send(documents);
});
// Update a document
router.put('/documents/:id', async (req, res) => {
  const { name, type } = req.body;
  const document = await Document.findByIdAndUpdate(req.params.id, { name, type }, { new: true });
  res.send(document);
});

// Delete a document
router.delete('/documents/:id', async (req, res) => {
  await Document.findByIdAndDelete(req.params.id);
  res.send({ message: 'Document deleted' });
});
router.post("/upload", upload);
router.get("/files", getListFiles);
router.get("/file", getFile);
router.get("/files/:name",download);



module.exports = router;
