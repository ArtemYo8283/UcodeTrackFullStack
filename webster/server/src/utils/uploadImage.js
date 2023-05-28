import multer from 'multer'
import * as jwt from 'jsonwebtoken';

const fileStorageEngineAvatar = (path) => multer.diskStorage({
    destination: (_req, _file, cb) => {
		  cb(null, path);
    },

    filename: (_req, file, cb) => {
      	cb(null, `${jwt.verify(_req.params.token, "jwt-key").login + '.' + file.originalname.split(".")[1]}`);
    },
});

export const uploadAvatarImage = multer({ storage: fileStorageEngineAvatar('./assets/avatars') });

