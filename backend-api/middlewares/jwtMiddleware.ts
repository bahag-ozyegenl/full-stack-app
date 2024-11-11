import {Request, Response, NextFunction} from 'express'
import jwt from 'jsonwebtoken'

export const authenticateJWT = async (req :Request, res : Response, next : NextFunction) : Promise<Response | any> => {
    console.log(req.headers.authorization?.split(' ')[1])
    const token = req.headers.authorization?.split(' ')[1]
    try {
        if (!token) {
            return res.status(403).json({message: 'Forbidden access, token is missing'})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string)
        if (!decoded) {
            return res.status(403).json({message : `Forbiden access, token os not valid`})
        }
        (req as Request & {user : any}).user = decoded
        next()
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: `Internal server error` })
    }
}