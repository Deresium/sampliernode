import Article from "../models/Article";
import ArticleVM from "../viewmodels/ArticleVM";
import { Op } from "sequelize"

const getAllArticles = async(type: string): Promise<Array<ArticleVM>> => {
    const articles = new Array<ArticleVM>();
    let where;
    if(type === 'VIDEOPODCAST') {
        where = {
            [Op.or]: [
                {articleTypeCode: 'VIDEO'},
                {articleTypeCode: 'PODCAST'}
            ]
        }
    }else{
        where = {articleTypeCode: type}
    }
    try {
        const articlesDb = await Article.findAll({
            where,
            include: {association: Article.associations.articleType},
            order: [['date', 'DESC']]
        })

        for(const articleDb of articlesDb){
            articles.push(new ArticleVM(articleDb.id, articleDb.articleTitle, articleDb.articleSubtitle, articleDb.typeName, articleDb.articleDate, articleDb.typeCode));
        }
    }catch(error){
        console.log(error);
        return articles;
    }
    return articles;
}

const getArticle = async(articleId: number): Promise<ArticleVM | null> => {
    try {
        const articleDb = await Article.findByPk(articleId,{
            include: {association: Article.associations.articleType}
        })
        return new ArticleVM(articleDb.id, articleDb.articleTitle, articleDb.articleSubtitle, articleDb.typeName, articleDb.articleDate, articleDb.typeCode);
    }catch(error){
        console.log(error);
        return null;
    }
}

export{
    getAllArticles,
    getArticle
}
