import express, {Application} from 'express'
import 'dotenv/config'
import cors from 'cors'
import {pool} from './database/db'
import authRouter from  './routes/authRouter'
import userRouter from  './routes/userRouter'
import bodyParser from 'body-parser'
import emailRouter from './routes/emailRouter'


const PORT = process.env.PORT
const app : Application = express()

const fs = require('fs');


app.get('/images', (req, res) => {
    fs.readdir('public/images', (err : any, files : any) => {
      if (err) {
        return res.status(500).send({ error: err });
      }
      res.send({ images: files });
    });
  });
  
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(bodyParser.json());

app.use('public/images', express.static('public/images'))
app.use('/api', authRouter, userRouter, emailRouter)


const startServer = async () => {
    try{
        const client = await pool.connect()
        console.log(`Connection with the database established 🟢`)
        client.release()
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    }
    catch(err){
        console.log(err, `Connection with the database not established 🔴`)
    }

}

startServer()