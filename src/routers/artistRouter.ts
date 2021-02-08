import express from "express";
import {getAllArtists, getArtist} from "../controllers/artistController";
import {getFromAWS} from "../awsCalls";
import articleRouter from "./articleRouter";

const artistRouter = express.Router();

artistRouter.get('/artists', async(req, res) => {
    res.send(await getAllArtists());
})

artistRouter.get('/artists/:artistId', async(req, res) => {
    const artistId = parseInt(req.params.artistId);
    res.send(await getArtist(artistId));
})

articleRouter.get('/artist/:artistId/image/:imageId', async(req, res) => {
    try{
        const artistId = req.params.artistId;
        const imageId = req.params.imageId;
        const imgName = `artist_${artistId}_${imageId}.jpg`;
        const picture = await getFromAWS(imgName);
        if(picture){
            res.set('Content-Type', 'image/jpeg');
            res.send(picture);
        }else{
            res.status(404).send();
        }
    }catch(error){
        console.log(error);
        res.status(500).send();
    }
})

export default artistRouter;