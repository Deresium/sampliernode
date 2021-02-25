import {Model, DataTypes} from "sequelize";
import {sequelize} from "../pgConnexion";

export default class Contact extends Model{
    private contactId: number;
    private name: string;
    private firstName: string;
    private email: string;
    private message: string;

    get contactName(){
        return this.name;
    }

    get contactFirstname(){
        return this.firstName;
    }

    get contactEmail(){
        return this.email;
    }

    get contactMessage(){
        return this.message
    }
}

Contact.init({
    contactId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    firstName: {
        type: DataTypes.STRING(256)
    },
    email: {
        type: DataTypes.STRING(512),
        allowNull: false
    },
    message: {
        type: DataTypes.STRING(4000),
        allowNull: false
    }
},{
    tableName: 'Contacts',
    sequelize
})