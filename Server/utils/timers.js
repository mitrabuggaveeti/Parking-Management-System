import nodemailer from 'nodemailer';
import activeBookingsModel from "../models/active-bookings.model.js";
import bookingsModel from "../models/bookings.model.js";

const smtpTrans = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "mitrab1998@gmail.com",
        pass: "mitra@12538875"
    }
});

const timersInfo = {

}

const mailTimerinfo={

}

export const setTimer = (bId, to,from,email) => {
    mailTimerinfo[`mail${bId}`] = setTimeout(()=>{
        const diff = (to.getTime()-from.getTime())/36e5
        console.log('mail sent',email);
        smtpTrans.sendMail({
            to:email,
            subject:'parking timeout',
            text:`Your parking time is going to be expired in ${diff>1?`${Math.abs(diff)} hours`:`${Math.abs(diff * 60)} minutes`} please re-book again`
        },(err,res)=>{
            if(err)console.log('error while sending mail',err);
            else console.log(res)
        })
    },(Math.abs(new Date().getTime()-to.getTime())/4));
    timersInfo[bId] = setTimeout(() => {
        clearTimeout(timersInfo[bId]);
        activeBookingsModel.findByIdAndRemove(bId, (err, res) => {
            if (err) console.log(err);
            else {
                new bookingsModel({ ...res.toJSON(), status: true }).save(err => {
                    if (err) console.log(err);
                })
            }
        })
    }, (Math.abs(to.getTime() - new Date().getTime())))
}

export const deleteTimer = (bId) => {
    clearTimeout(timersInfo[bId]);
    clearTimeout(`mail${bId}`);
};