import express from "express";
import {getAllReleases, getRelease} from "../controllers/releaseController";
import Release from "../models/Release";
import {authOnlyAdmin} from "../middlewares/authentication";
import {getFromAWS, sendToAWS} from "../awsCalls";
import articleRouter from "./articleRouter";
import multer from "multer";

const releaseRouter = express.Router();

releaseRouter.get('/release', async(req, res) => {
    res.send(await getAllReleases());
})

releaseRouter.get('/release/:id', async(req, res) => {
    const releaseId = parseInt(req.params.id);
    res.send(await getRelease(releaseId));
})

const upload = multer();
releaseRouter.put('/release/:id', authOnlyAdmin, upload.single('file'), async(req, res) => {
    try{
        const releaseId = parseInt(req.params.id);
        await Release.update({
            name: req.body.name,
            description: req.body.description,
            artistId: req.body.artistId,
            type: req.body.type,
            date: req.body.date
        },{
            where:{
                releaseId
            }
        })
        if(req.file) {
            const image = req.file;
            const fileName = `release_${releaseId}`;
            await sendToAWS(image.buffer, fileName)
        }
        res.send();
    }catch(error){
        console.log(error);
        res.status(500).send();
    }
})

releaseRouter.delete('/release/:id', authOnlyAdmin, async(req, res) => {
    try{
        const releaseId = parseInt(req.params.id);
        await Release.destroy({
            where:{
                releaseId
            }
        })
        res.send();
    }catch(error){
        console.log(error);
        res.status(500).send();
    }
})


releaseRouter.post('/release', authOnlyAdmin, upload.single('file'), async(req, res) => {
    if(!req.file){
        res.status(500).send();
        return;
    }
    try {
        const release = await Release.create({
            name: req.body.name,
            description: req.body.description,
            artistId: req.body.artistId,
            type: req.body.type,
            date: req.body.date
        })
        const image = req.file;
        const fileName = `release_${release.id}`;
        await sendToAWS(image.buffer, fileName)
        res.send();
    }catch(error){
        console.log(error);
        res.status(500).send();
    }
})

releaseRouter.post('/release/:id/image', authOnlyAdmin, upload.single('file'), async(req, res) => {
    const image = req.file;
    const releaseId = req.params.id;
    const fileName = `release_${releaseId}`;
    await sendToAWS(image.buffer, fileName)
    res.send();
})

releaseRouter.get('/release/:id/image', async(req, res) => {
    try{
        const releaseId = req.params.id;
        const imgName = `release_${releaseId}`;
        const picture = await getFromAWS(imgName);
        if(picture){
            res.set('Content-Type', 'image/*');
            res.send(picture);
        }else{
            res.status(404).send();
        }
    }catch(error){
        console.log(error);
        res.status(500).send();
    }
})

export default releaseRouter;