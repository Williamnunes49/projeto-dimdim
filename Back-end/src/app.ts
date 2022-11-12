// ENV variable
require("dotenv").config()

import express from "express";
import cors from "cors"
const app = express();

app.use(cors())

// JSON middleware
app.use(express.json());

// DB
const db = require("./database")

// Routes
import router from "./routes/router"

// Logger
import Logger from "../config/logger";

db.hasConection();

// Middlewares
import morganMiddleware from "./middlewares/morganMiddleware"
import handleError from "../src/middlewares/handleError"

app.use(morganMiddleware);
app.use(router);
app.use(handleError)

app.listen(3000,  () => Logger.info("Servidor rodando na porta 3000"))