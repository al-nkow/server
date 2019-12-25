const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './static/uploads');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname); // cb(null, file.filename)
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2 mb file size allowed
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png'
    ) {
      cb(null, true); // accept file
    } else {
      cb(null, false); // reject file
    }
  },
});

module.exports = upload;
