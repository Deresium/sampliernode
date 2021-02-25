import sgMail from '@sendgrid/mail'
import Contact from "./models/Contact";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const to = 'dimitri.steinbusch@creatiview.be';
const from = 'no-reply@creatiview.be';
const sendContactMail = async(contact: Contact)=>{
    await sgMail.send({
        to,
        from,
        subject: `Nouveau message de ${contact.contactFirstname} ${contact.contactName}`,
        text: getMessage(contact, '\n'),
        html: getMessage(contact, '<br/>')
    });
};

const getMessage = (contact: Contact, separator: string) => {
    return `Nouveau message de ${contact.contactFirstname} ${contact.contactName} (${contact.contactEmail}):${separator}
        ${contact.contactMessage.replace('\n', separator)}
    `
}

export {
    sendContactMail
}