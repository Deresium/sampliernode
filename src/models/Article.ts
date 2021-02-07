import {Model, DataTypes, Association} from "sequelize";
import {sequelize} from "../pgConnexion";
import ArticleType from "./ArticleType";

export default class Article extends Model{
    private articleId: number;
    private title: string;
    private subtitle: string;
    private date: Date;
    private articleTypeCode: string;
    private articleType: ArticleType;

    public static associations: {
        articleType: Association<Article, ArticleType>;
    }

    get id(){
        return this.articleId;
    }

    get articleTitle(){
        return this.title;
    }

    get articleSubtitle(){
        return this.subtitle;
    }

    get articleDate(){
        return this.date;
    }

    get type(){
        return this.articleType;
    }

    get typeName(){
        if(this.articleType)
            return this.articleType.articleTypeName;
        return null;
    }

    get typeCode(){
        return this.articleTypeCode;
    }
}

Article.init({
    articleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(1024),
        allowNull: false
    },
    subtitle: {
        type: DataTypes.STRING(4000)
    },
    date: {
        type: DataTypes.DATE
    },
    articleTypeCode:{
        type: DataTypes.STRING(10),
        allowNull: false
    }
},{
    tableName: 'Articles',
    sequelize
})

Article.belongsTo(ArticleType, {foreignKey: 'articleTypeCode', targetKey: 'articleTypeCode', as:'articleType'});