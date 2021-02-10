import express from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import Roles from "../enums/roles";
import jwt from "jsonwebtoken";
import {generateAuth, logout} from "../cookies";


const userRouter = express.Router();

userRouter.post('/createAccount', async(req, res) => {
	const name = req.body.name;
	const firstName = req.body.firstName;
	const email = req.body.email;
	const password = req.body.password;
	
	try{
		const foundUser = await User.findOne({where: {email}});
		if(foundUser) {
			res.status(400).send('Un utilisateur associé à cet email existe déjà');
			return;
		}
		
		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);
		await User.create({
			name,
			firstName,
			email,
			password: passwordHash,
			salted: salt,
			roleCode: Roles.USER
		});
		res.send();
	}catch(error){
		res.status(500).send();
		console.log(error);
	}
});

userRouter.post('/login', async(req, res) => {
	let userLoginSuccess: User | undefined = undefined;
	
	const email = req.body.email;
	const password = req.body.password;
	
	try{
		const foundUser = await User.findOne({
			where: {
				email
			}
		});
		if(!foundUser) {
			res.status(400).send('Email ou mot de passe incorrect');
			return;
		}
		
		const passwordHash = await bcrypt.hash(password, foundUser.userSalted);
		const compare = passwordHash === foundUser.userPassword;
		if(compare){
			userLoginSuccess = foundUser;
		}else{
			res.status(400).send('Email ou mot de passe incorrect');
			return;
		}
		
		if(userLoginSuccess){
			generateAuth(userLoginSuccess.id, userLoginSuccess.userRole, res);
			res.status(200).send(userLoginSuccess.userRole);
		}
		
	}catch(error) {
		console.log(error);
		res.status(500).send();
	}
});

userRouter.post('/logout', async(req, res) => {
	logout(res);
	res.send();
});

userRouter.post('/forgotPassword', async(req, res) => {
	const email = req.body.email;
	const foundUser = await User.findOne({where: {email}});
	if(foundUser){
		const salt = await bcrypt.genSalt(10);
		const token = jwt.sign({salt}, process.env.JWT_SECRET_2, {expiresIn: 60*60*2});
		foundUser.userLostPasswordToken = token;
		await foundUser.save();
		//await sendLostPasswordMail(foundUser.userEmail, foundUser.fullName, token);
	}
	res.send();
})

userRouter.post('/newPassword', async(req, res) => {
	const token = req.body.token;
	const password = req.body.password;
	const foundUser = await User.findOne({where: {lostPasswordToken: token}});
	if(!foundUser){
		res.status(400).send();
	}
	try {
		jwt.verify(token, process.env.JWT_SECRET_2);
		const salt = await bcrypt.genSalt(10);
		const passwordHash = await bcrypt.hash(password, salt);
		foundUser.userPassword = passwordHash;
		foundUser.userSalted = salt;
		foundUser.userLostPasswordToken = null;
		await foundUser.save();
		res.status(200).send();
	}catch(error){
		console.log(error);
		res.status(400).send();
	}
})

export default userRouter;