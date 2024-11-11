import { Request, Response } from 'express'
import { transporter } from '../middlewares/emailTransporter';

export const sendEmail = async (req: Request, res: Response): Promise<Response | any> => {
    const {from, subject, text} = req.body
    if(!from || !subject || !text){
        return res.status(400).json({message : `All fields are required`})
    }
    try {
        await transporter.sendMail({
            from: from,
            to: 'dev.cyth@gmail.com',
            subject: subject + ' ' + from,
            text: text
        });

        res.status(200).json({message : 'Email sent successfully'});
    }

    catch (err) {
        console.log(err)
        return res.status(500).json({ message: `Internal server error` })
    }
}