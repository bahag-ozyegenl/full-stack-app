import { Request, Response, NextFunction } from "express";


export const checkUserData = (checkForAllFields: boolean) => {
    return async (req : Request, res : Response, next : NextFunction): Promise<Response | any> => {
        const {name, email, password} = req.body
        try{
            if(checkForAllFields){
                if (!name || !email || !password) {
                    return res.status(403).json({ message: `All fields are required` })
                }
                else {
                    next()
                }
            }
            else{
                if (!email || !password) {
                    return res.status(403).json({ message: `Email and password are required` })
                }
                else {
                    next()
                }
            }
        }
        catch (err) {
            console.log(err)
            return res.status(500).json({ message: `Internal server error` })
        }
    }
}