import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors"
import Mongo from "./config/dbConnect.js";
import route from "./router/router.js";

dotenv.config();
Mongo.connect();

const app = express();
app.use(morgan('dev'))
app.use(express.json());
app.use(cors({
    origin:process.env.CLIENT_URI,
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
    }
))

app.use("/", route)

const port = process.env.PORT

app.listen(port, () => console.log(`server running on port: ${port}`))
