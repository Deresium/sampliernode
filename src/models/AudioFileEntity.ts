import {Model, DataTypes} from "sequelize";
import {sequelize} from "../pgConnexion";

export default class AudioFileEntity extends Model{
    private audioFileId: number;
    private name: string;
    private dropSongId: number;

    getName(){
        return this.name;
    }

    getAudioFileId(){
        return this.audioFileId;
    }
}

AudioFileEntity.init({
    audioFileId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(1024),
        allowNull: false
    },
    dropSongId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: 'AudioFiles',
    sequelize
})