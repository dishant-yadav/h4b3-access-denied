// // routes/uploadRoute.js
// const express = require('express');
// const multer = require('multer');
// const { bucket } = require('../utils/firebase');
// const router = express.Router();

// // Set up multer for file handling
// const upload = multer({ storage: multer.memoryStorage() });

// // Function to get current date and time
// const giveCurrentDateTime = () => {
//   const today = new Date();
//   const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
//   const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//   const dateTime = date + ' ' + time;
//   return dateTime;
// }

// // Route to upload PDF file
// router.post('/', upload.single('filename'), async (req, res) => {
//   try {
//     const dateTime = giveCurrentDateTime();
//     const fileName = `${req.file.originalname}_${dateTime}`;
//     const file = bucket.file(fileName);

//     const stream = file.createWriteStream({
//       metadata: {
//         contentType: req.file.mimetype
//       }
//     });

//     stream.on('error', (err) => {
//       res.status(500).json({ message: 'Error uploading file', err });
//     });

//     stream.on('finish', async () => {
//       // Make the file public
//       await file.makePublic();

//       const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
//       res.status(200).json({ message: 'File uploaded successfully', downloadURL: publicUrl });
//     });

//     stream.end(req.file.buffer);
//   } catch (error) {
//     res.status(500).json({ message: 'Error uploading file', error });
//   }
// });

// module.exports = router;
