// const mongoose = require('mongoose');
// const Grid = require('gridfs-stream');

// let gfs;

// exports.initGFS = function(db) {
//   gfs = Grid(db.collection('photos'));
//   gfs.collection('photos');
// }

// // Upload a file to the database and return its id
// exports.uploadFile = function (file, callback) {
//     // Write the file data to GridFS
//     var writeStream = gfs.createWriteStream({
//       filename: file.originalname
//     });

//     writeStream.on("error", function(err) {
//       callback(err);
//     });

//     writeStream.on("close", function(file) {
//       callback(null, file._id);
//     });

//     writeStream.write(file.buffer);
//     writeStream.end();
// };

// // Get a file from the database by id
// exports.getFileById = function(id, callback) {
//   gfs.files.findOne({_id: id} ,function (err, file) {
//     // Check if file
//     if (!file || file.length === 0) {
//       return callback(new Error('No file exists with that id'), null);
//     }
//     else {
//       // Stream the file to the response object
//       var readStream = gfs.createReadStream({
//         _id: id
//       });
//       // Pipe the file stream to the response object and set headers
//     }
// })};


        
// const Schema = mongoose.Schema;

// const uploadSchema = new Schema({
//   name: { type: String, required: true },
//   filePath: { type: String, required: true }, // relative to public folder
// });

// const File = mongoose.model('File', uploadSchema);
// gfs = Grid(File.collection('photos'));
// module.exports = File;