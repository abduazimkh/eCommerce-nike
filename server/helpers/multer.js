const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./tmp");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/webp' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/avif' || file.mimetype === 'video/mp4' || file.mimetype === 'video/mov'){
        cb(null, true)
    }

    else{
        cb({message: "Not valid format!"}, false)
    }
}


const upload = multer({
    storage: storage,
    limits: {fileSize: 2000000024*2000000024},
    fileFilter: fileFilter
})

module.exports = upload;