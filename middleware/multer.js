const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');   // specify the destination directory    
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // specify the file name
    }
}); 
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true); // accept file
    } else {
        cb(new Error('Invalid file type, only image is allowed!'), false); // reject file
    }       
};
const limits = {
    fileSize: 1024 * 1024 * 3 //3MB file size limit
};  
const upload = multer({
    storage,
    fileFilter,
    limits
});
module.exports = upload;