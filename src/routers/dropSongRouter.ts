import express from "express";
import multer from "multer";
import * as fs from "fs";
import AudioFile from "../business/filechecker/AudioFile";
import FileChecker from "../business/filechecker/FileChecker";
import FileCheckerWithFileType from "../business/filechecker/FileCheckerWithFileType";
import DropSong from "../business/filechecker/DropSong";
import IDropSongDataGateway from "../database/IDropSongDataGateway";
import DropSongDataGateway from "../database/DropSongDataGateway";
import {authOnlyAdmin} from "../middlewares/authentication";
import {sendDropSongMail} from "../sendgridSamplier";

const dropSongRouter = express.Router();

const upload = multer();
dropSongRouter.post('/dropSong', upload.array('files'), async(req, res) => {
    if(Array.isArray(req.files)) {
        const audioFileArray: Array<AudioFile> = req.files.map(file => {
            return new AudioFile(file.originalname, file.buffer)
        })
        const fileChecker: FileChecker = new FileCheckerWithFileType();
        const dropSong = new DropSong(req.body.name, req.body.email, audioFileArray);

        if(!await dropSong.isValid(fileChecker)) {
            res.status(400).send('Veuillez vérifier les formats des fichiers envoyés.');
            return;
        }

        const dropSongDataGateway: IDropSongDataGateway = new DropSongDataGateway();
        await dropSongDataGateway.save(dropSong);
        await sendDropSongMail(dropSong);

        res.status(200).send();


    }else {
        res.status(400).send();
        return;
    }
})

dropSongRouter.get('/dropSong', authOnlyAdmin, async(req, res) => {
    const dropSongDataGateway: IDropSongDataGateway = new DropSongDataGateway();
    const dropSongs = await dropSongDataGateway.findAll();
    res.status(200).send(dropSongs);
})

export default dropSongRouter;