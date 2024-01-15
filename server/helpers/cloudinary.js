const cloudinary = require("cloudinary");
const dotenv = require('dotenv');
dotenv.config();
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploads = (file, folder) => {
  return new Promise (resolve => {
    cloudinary.uploader.upload(file, result => {
      resolve(
         result.url
      )
    }, {
      resource_type: "auto",
      folder: folder
    })
  })
}


exports.destroyer = (public_id) => {
  return new Promise (resolve => {
    cloudinary.uploader.destroy(public_id, result => {
      resolve(
        result
      )
    })
  })
}