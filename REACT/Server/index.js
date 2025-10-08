import express,{json} from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import { loginRoute } from './Routes/LoginRoute.js'
import cors from 'cors'
import { adminroute } from './Routes/AdminRoute.js'
import { UserRoute } from './Routes/UserRoute.js'

dotenv.config()

const app = express()

app.use(cors({
    origin:'*',
    credentials:true
}))


app.use(json())
app.use('/',loginRoute)
app.use('/',adminroute)
app.use('/',UserRoute)


mongoose.connect('mongodb://mongodb/ONLINE_TICKET').then(()=>{
    console.log('MongoDB connected successfully to ONLINE_TICKET' );
})
.catch((error)=>{
    console.log('MongoDB connection failed:',error)

});

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})