import {Model, DataTypes} from "sequelize";
import {sequelize} from "../pgConnexion";
import Roles from "../enums/roles";

export default class User extends Model{
	private userId: number;
	private name: string;
	private firstName: string;
	private email: string;
	private password: string;
	private salted: string;
	private roleCode: Roles;
	private phone: string;
	private lostPasswordToken: string;
	
	get id(){
		return this.userId;
	}
	
	get userName(){
		return this.name;
	}
	
	get userFirstName(){
		return this.firstName;
	}

	get userPhone(){
		return this.phone;
	}
	
	get userPassword(){
		return this.password;
	}
	
	set userPassword(password){
		this.password = password;
	}
	
	get userEmail(){
		return this.email;
	}
	
	get userSalted(){
		return this.salted;
	}
	
	set userSalted(salted){
		this.salted = salted;
	}
	
	get userRole(){
		return this.roleCode;
	}
	
	get userLostPasswordToken(){
		return this.lostPasswordToken;
	}
	
	set userLostPasswordToken(token: string){
		this.lostPasswordToken = token;
	}
	
	get fullName() {
		if (this.firstName)
			return `${this.firstName} ${this.name}`
		else
			return this.name
	}
}

User.init({
	userId: {
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
	password: {
		type: DataTypes.STRING(1024)
	},
	salted: {
		type: DataTypes.STRING(1024)
	},
	roleCode: {
		type: DataTypes.STRING(10)
	},
	phone: {
		type: DataTypes.STRING(256)
	},
	lostPasswordToken: {
		type: DataTypes.STRING(1024)
	}
},{
	tableName: 'Users',
	sequelize
})