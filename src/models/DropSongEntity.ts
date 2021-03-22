import {Model, DataTypes, Association} from "sequelize";
import {sequelize} from "../pgConnexion";
import AudioFileEntity from "./AudioFileEntity";

export default class DropSongEntity extends Model{
    private dropSongId: number;
    private name: string;
    private email: string;
    private audioFiles?: AudioFileEntity[];

    getName(){
        return this.name;
    }

    getEmail(){
        return this.email;
    }

    getDropSongId(){
        return this.dropSongId
    }

    getAudioFiles(){
        return this.audioFiles;
    }

    public static associations: {
        audioFiles: Association<DropSongEntity, AudioFileEntity>;
    }
}

DropSongEntity.init({
    dropSongId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(512),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(1024),
        allowNull: false
    },
    createdAt:{
        type: DataTypes.DATE
    }
},{
    tableName: 'DropSongs',
    sequelize
})

DropSongEntity.hasMany(AudioFileEntity, {sourceKey: 'dropSongId', foreignKey: 'dropSongId', as:'audioFiles'});