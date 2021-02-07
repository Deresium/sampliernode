import cookie from "cookie";
import Roles from "./enums/roles";
import jwt from "jsonwebtoken";

const getSignatureCookie = (value: string, deleteCookie = false) => {
	return cookie.serialize('signature', value, {
		secure: process.env.NODE_ENV === 'production',
		httpOnly: true,
		maxAge: deleteCookie? 0: 60*60*24,
		domain: process.env.DNS_NAME,
		sameSite: true,
		path: '/'
	});
}

const getPayloadCookie = (value: string, deleteCookie = false) => {
	return cookie.serialize('payload', value, {
		secure: process.env.NODE_ENV === 'production',
		maxAge: deleteCookie? 0: 60*60*24,
		domain: process.env.DNS_NAME,
		sameSite: true,
		path:'/'
	});
}

const generateAuth = (userId: number, userRole: Roles, res: any) => {
	const token = jwt.sign({id: userId, role: userRole}, process.env.JWT_SECRET,{expiresIn: 60*60*24}).split('.');
	const signatureCookieValue = token[2];
	const payloadCookieValue = `${token[0]}.${token[1]}`;
	res.setHeader('Set-Cookie', [getSignatureCookie(signatureCookieValue), getPayloadCookie(payloadCookieValue)]);
}

const logout = (res: any) => {
	res.setHeader('Set-Cookie', [getSignatureCookie('', true), getPayloadCookie('', true)]);
}

export {
	generateAuth,
	logout
}