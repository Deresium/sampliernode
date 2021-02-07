import express from "express";
import Article from "../models/Article";
import {getAllArticles, getArticle} from "../controllers/articleController";
import {getFromAWS} from "../awsCalls";

const articleRouter = express.Router();

articleRouter.get('/article', async(req, res) => {
    const type = <string>req.query.type;
    const response = await getAllArticles(type);
    res.send(response);
})

articleRouter.get('/article/:articleId', async(req, res) => {
    const articleId = parseInt(req.params.articleId);
    res.send(await getArticle(articleId))
})

articleRouter.get('/article/:articleId/image/:imageId', async(req, res) => {
        try{
            const articleId = req.params.articleId;
            const imageId = req.params.imageId;
            const imgName = `${articleId}_${imageId}.jpg`;
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

export default articleRouter;