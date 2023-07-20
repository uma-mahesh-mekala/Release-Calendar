const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) { 
        cb(null,'./public/images');
    },
    filename: function (req, file, cb) { 
        var ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' +path.basename(file.originalname,ext)+'-'+ Date.now() + ext);
    }
})

const upload = multer({ storage: storage });

module.exports = upload;