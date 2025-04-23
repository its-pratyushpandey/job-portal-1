import multer from "multer";

// Using memory storage for quick access (can be used with cloud uploads)
const storage = multer.memoryStorage();

// Single file upload handler expecting field name "file"
export const singleUpload = multer({ storage }).single("file");