import sgMail from '@sendgrid/mail'
import Contact from "./models/Contact";
import DropSong from "./business/filechecker/DropSong";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const to = 'contact.samplier@gmail.com';
//const to = 'dimitri.steinbusch@hotmail.com';
const from = 'no-reply@samplier.be';
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

const sendDropSongMail = async(dropSong: DropSong) => {
    await sgMail.send({
        to,
        from,
        subject: `${dropSong.getName()} vient de déposer un son sur Samplier`,
        text: getMessageDropSong(dropSong, '\n'),
        html: getMessageDropSong(dropSong, '<br/>')
    })
    console.log(`mail send to ${to}`);
}

const getMessageDropSong = (dropSong: DropSong, separator: string) => {
    return `${dropSong.getName()} (${dropSong.getEmail()}) vient de déposer un son sur Samplier.${separator}
    Ecoutez le son directement sur <a clicktracking="off" href="${getUrl()}">Samplier</a>`
}

const getUrl = () => {
    if(process.env.NODE_ENV !== 'production')
        return `http://${process.env.DNS_NAME}:${process.env.PORT}/admin/dropSong`
    return `https://www.${process.env.DNS_NAME}/admin/dropSong`
}

export {
    sendContactMail,
    sendDropSongMail
}