import multer from 'multer';
import { v4 as uuid } from 'uuid';
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/'); // Save files to the 'uploads/' directory
    },
    filename(req, file, cb) {
        const id = uuid(); // Generate unique ID 

        const extName = file.originalname.split('.').pop(); // Extract extension (e.g., "jpg")
        

        const fileName = `${id}.${extName}`;// Create unique filename (e.g., "abc123-def456.jpg")

        cb(null, fileName); // Set the filename
    },
});

export const uploadFiles = multer({ storage }).single("file");