import {Model, DataTypes, Association} from "sequelize";
import {sequelize} from "../pgConnexion";
import ArticleType from "./ArticleType";
import Article from "./Article";
import Hashtag from "./Hashtag";

export default class Artist extends Model{
    private artistId: number;
    private name: string;
    private description: string;
    private hashtags?: Hashtag[];

    get id(){
        return this.artistId;
    }

    get artistName(){
        return this.name;
    }

    get artistDescription(){
        return this.description;
    }

    get artistHashtags(){
        return this.hashtags;
    }

    public static associations: {
        hashtags: Association<Artist, Hashtag>;
    }
}

Artist.init({
    artistId: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(4000)
    }
},{
    tableName: 'Artists',
    sequelize
})

Artist.hasMany(Hashtag, {sourceKey: 'artistId', foreignKey: 'artistId', as:'hashtags'});