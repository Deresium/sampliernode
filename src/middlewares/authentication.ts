import {RequestHandler} from "express";
import jwt from "jsonwebtoken"
import cookie from "cookie";
import Roles from "../enums/roles";
import {generateAuth} from "../cookies";

const auth: RequestHandler = async(req, res, next) =>{
    try{
        extractToken(req, res);
        if(req.userId && req.userRole)
            next();
        else
            res.status(401).send('Please authenticate');
    }catch(e){
        res.status(401).send('Please authenticate');
    }
};

const authOnlyAdmin: RequestHandler = async(req, res, next) =>{
    try{
        extractToken(req, res);
        if(req.userId && req.userRole && req.userRole === Roles.ADMIN)
            next();
        else
            res.status(401).send('Please authenticate');
    }catch(e){
        res.status(401).send('Please authenticate');
    }
}

const onlyExtractToken: RequestHandler = async(req, res, next) =>{
    extractToken(req, res);
    next();
}

const extractToken = (req: any, res: any) => {
    const cookies = cookie.parse(req.headers.cookie || '');
    const sign = cookies.signature;
    const payload = cookies.payload;
    if(sign && payload) {
        const token = `${payload}.${sign}`;
        const decrypt = <any>jwt.verify(token, process.env.JWT_SECRET);
        // @ts-ignore
        req.userRole = Roles[decrypt.role];
        req.userId = decrypt.id;
        if(req.userRole && req.userId) {
            generateAuth(req.userId, req.userRole, res);
        }
    }
}

export {
    auth,
    authOnlyAdmin,
    onlyExtractToken
}