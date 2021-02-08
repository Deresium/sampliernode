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

const app = express();

const initRouting = async() => {
    await connect()
    
    const publicDirectoryPath = path.join(__dirname, '../public');
    
    if(process.env.NODE_ENV === 'production') {
        app.use(redirectHttps);
    }else{
        app.use(allowLocalhost);
    }
    app.use(returnIndex);
    
    app.use(express.json());

    app.use(userRouter);
    app.use(articleRouter);
    app.use(artistRouter);
    
    app.use(express.static(publicDirectoryPath));
}

initRouting().then(() => console.log('init routing ok'));

export default app;