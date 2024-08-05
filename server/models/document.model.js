const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  size: { type: Number, required: true },
  uploadDate: { type: Date, default: Date.now },
  filePath: { type: String, required: true }
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;