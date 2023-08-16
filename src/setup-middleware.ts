import express from "express";
import cookieParser from 'cookie-parser';
import {modifyResponse} from "./middlewares/response.innterceptor";

const session = require('express-session');

export const setupMiddleware = (app: express.Application) => {
    app.use(express.json());
    app.use(cookieParser());
    app.use(modifyResponse);
    app.use(session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
    }));
};