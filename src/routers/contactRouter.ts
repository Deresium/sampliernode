import express from "express";
import Contact from "../models/Contact";
import {sendContactMail} from "../sendgridSamplier";

const contactRouter = express.Router();

contactRouter.post('/contact', async(req, res) => {
    try {
        const contact = await Contact.create({
            name: req.body.name,
            firstName: req.body.firstName,
            email: req.body.email,
            message: req.body.message
        })
        //await sendContactMail(contact);
        res.send();
    }catch(error) {
        res.status(500).send();
    }

})

export default contactRouter;