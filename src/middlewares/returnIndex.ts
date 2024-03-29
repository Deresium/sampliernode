import {RequestHandler} from "express";
import path from "path";

const returnIndex: RequestHandler = (req, res, next) => {
    if(req.headers.accept?.includes('text/html') && !req.originalUrl.endsWith('.txt')){
        const publicDirectoryPath = path.join(__dirname, '../../public/samplier');
        res.sendFile(publicDirectoryPath + '/index.html');
    }else
        next();
}

export default returnIndex;