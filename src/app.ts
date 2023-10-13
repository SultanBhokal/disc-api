import cors from "cors";
import express from "express";
import dictionaryRoutes from "./routes/dictionaryRoutes";
import * as dotenv from 'dotenv';

// configure dot env
dotenv.config({
    path:"../.env"
})

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/dictionary",dictionaryRoutes)

app.listen(process.env.PORT || 5000,()=>{
    console.log(`Listening PORT ${process.env?.PORT || 5000}`)
})