import {Model, DataTypes, Association} from "sequelize";
import {sequelize} from "../pgConnexion";
import Artist from "./Artist";

export default class Release extends Model{
    private releaseId: number;
    private name: string;
    private description: string;
    private artistId: number;
    private type: string;
    private date: Date;
    private artist: Artist;

    public static associations: {
        artist: Association<Release, Artist>;
    }

    get id(){
        return this.releaseId;
    }

    get releaseName(){
        return this.name;
    }

    get releaseDescription(){
        return this.description;
    }

    get releaseArtistId(){
        return this.artistId;
    }

    get releaseType(){
        return this.type;
    }

    get releaseDate(){
        return this.date;
    }

    get releaseArtistName(){
        if(this.artist)
            return this.artist.artistName
        return null;
    }
}

Release.init({
    releaseId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(4000)
    },
    artistId: {
        type: DataTypes.INTEGER,
    },
    type: {
        type: DataTypes.STRING(256),
    },
    date: {
        type: DataTypes.DATE
    }
},{
    tableName: 'Releases',
    sequelize
})
Release.belongsTo(Artist, {foreignKey: 'artistId', targetKey: 'artistId', as:'artist'})