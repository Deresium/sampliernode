import express from "express";
import {authOnlyAdmin} from "../middlewares/authentication";
import IDropSongDataGateway from "../database/IDropSongDataGateway";
import DropSongDataGateway from "../database/DropSongDataGateway";
import {getFromAWS} from "../awsCalls";

const downloadFileRouter = express.Router();

downloadFileRouter.get('/audioFile/:idAudioFile', authOnlyAdmin, async(req, res) => {
    const dropSongDataGateway: IDropSongDataGateway = new DropSongDataGateway();
    const idAudioFile = parseInt(req.params.idAudioFile);
    const audioFile = await dropSongDataGateway.findAudioFileNameStock(idAudioFile);
    if(!audioFile){
        res.status(400).send('Une erreur est survenue lors de la récupération du fichier');
        return;
    }
    const file = await getFromAWS(audioFile.getStockName());
    if(!file){
        res.status(400).send('Une erreur est survenue lors de la récupération du fichier');
        return;
    }
    res.set('Content-Type', 'audio/*');
    res.set('Content-Disposition', `attachment; filename="${audioFile.getFileName()}"`);
    res.send(file);
})

export default downloadFileRouter