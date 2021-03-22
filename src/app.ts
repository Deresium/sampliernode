import express from "express";
import * as process from "process";
import path from "path";
import {connect} from "./pgConnexion";
import redirectHttps from "./middlewares/redirectHttps";
import allowLocalhost from "./middlewares/allowLocalhost";
import returnIndex from "./middlewares/returnIndex";
import userRouter from "./routers/userRouter";
import articleRouter from "./routers/articleRouter";
import artistRouter from "./routers/artistRouter";
import releaseRouter from "./routers/releaseRouter";
import contactRouter from "./routers/contactRouter";
import dropSongRouter from "./routers/dropSongRouter";
import downloadFileRouter from "./routers/downloadFileRouter";

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public/samplier');

if(process.env.NODE_ENV === 'production') {
    app.use(redirectHttps);
}else{
    app.use(allowLocalhost);
}

app.use(express.json());

app.use(downloadFileRouter);

app.use(returnIndex);

app.use(userRouter);
app.use(articleRouter);
app.use(artistRouter);
app.use(releaseRouter);
app.use(contactRouter);
app.use(dropSongRouter);

app.use(express.static(publicDirectoryPath));

export default app;