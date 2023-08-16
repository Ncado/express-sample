// src/index.ts
import express from "express";

import dotenv from 'dotenv';
import apiRouter from "./app.routes";
import {initializeDatabase} from "./modules/relations/actor-movie.relation";
import {setupMiddleware} from "./setup-middleware";

const router = express.Router();

const session = require('express-session');

dotenv.config();

const app = express();
setupMiddleware(app);


app.use('/api/v1', apiRouter);

initializeDatabase().then(() => {

    console.log('Database & tables created!');

    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
});