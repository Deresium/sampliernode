import {Model, DataTypes} from "sequelize";
import {sequelize} from "../pgConnexion";

export default class Hashtag extends Model{
    private hashtagId: number;
    private name: string;
    private artistsId: number;

    get hashtagName(){
        return this.name;
    }
}

Hashtag.init({
    hashtagId:{
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    artistId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: 'Hashtags',
    sequelize
})