import {Request, Response} from 'express'
import {query} from '../database/db'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {User} from '../types/User'


export const registerUser = async (req: Request, res: Response): Promise<Response | any> => {
    const { name, email, password } = req.body
    const image =  '/public/images/' + req.file?.filename
    console.log(req.body, req.file)
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        await query(`INSERT INTO users (name, email, password, profile_picture) VALUES ($1, $2, $3, $4)`, [name, email, hashedPassword, image])

        return res.status(201).json({ message: `User successfully registered` })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: `Internal server error` })
    }
}


export const loginUser = async (req : Request, res : Response): Promise<Response | any> => {
    const user = (req as Request & {user : User}).user
    const {password} = req.body
    try{
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return  res.status(400).json({message : 'Invalid credentials'})
        }
        
        const token = jwt.sign({id : user.id}, process.env.JWT_SECRET as string, {expiresIn : '2h'})
        return res.status(200).json({message: "User logged in successfuly", user : {
            id : user.id,
            name : user.name,
            email : user.email, 
            profilepicture : user.profile_picture
        }, token})
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ message: `Internal server error` })
    }
}