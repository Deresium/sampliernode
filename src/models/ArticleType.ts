import {Model, DataTypes} from "sequelize";
import {sequelize} from "../pgConnexion";

export default class ArticleType extends Model{
    private articleTypeCode: string;
    private name: string;

    get articleTypeName(){
        return this.name;
    }
}

ArticleType.init({
    articleTypeCode: {
        type: DataTypes.STRING(10),
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(256)
    }
},{
    tableName: 'ArticleTypes',
    sequelize
})